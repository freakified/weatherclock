import { getMinutesBetweenDates } from './timeUtils';

export interface WeatherMeta {
    lastUpdated: Date

    // Determined via browser
    lat: number
    lng: number

    // Information from Point API
    forecastURI: string
    stationsURI: string

    // Information from Stations API
    stationId: string
    stationName: string
    observationURI: string
}

export interface WeatherData {
    lastUpdated: Date
    forecast: {
        name: string
        shortForecast: string
        detailedForecast: string
    };
    current: {
        description: string
        temperature: number
    }
}

const cToF = (tempInC: number) => {
    return Math.round(tempInC * 1.8 + 32);
}

const getLocation = async () => {
    try {
        const pos = await new Promise((resolve: PositionCallback, reject: PositionErrorCallback) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        return pos;
    } catch(error) {
        return null;
    }
}

const fetchNewWeatherMeta = async (lat: number, lng: number) => {
    const pointURI = `https://api.weather.gov/points/${lat},${lng}`;

    // Get NWS point data from lat/lng
    const pointResponse = await fetch(pointURI);
    const pointData = await pointResponse.json();

    const stationsURI = pointData.properties.observationStations;

    // Get NWS station data
    const stationsResponse = await fetch(stationsURI);
    const stationsData = await stationsResponse.json();

    // Return filled-out WeatherMeta
    return({
        lastUpdated: new Date(),
        lat,
        lng,
        forecastURI: pointData.properties.forecast,
        stationsURI: pointData.properties.observationStations,
        observationURI: `https://api.weather.gov/stations/${stationsData.features[0].properties.stationIdentifier}/observations`,
        stationId: stationsData.features[0].properties.stationIdentifier,
        stationName: stationsData.features[0].properties.name
    });
}

const fetchNewWeatherData = async (weatherMeta: WeatherMeta) => {
    const forecastResponse = await fetch(weatherMeta.forecastURI);
    const forecastData = await forecastResponse.json();

    const observationResponse = await fetch(weatherMeta.observationURI);
    const observationData = await observationResponse.json();
    
    return({
        lastUpdated: new Date(),
        forecast: {
            name: forecastData.properties.periods[0].name,
            shortForecast: forecastData.properties.periods[0].shortForecast,
            detailedForecast: forecastData.properties.periods[0].detailedForecast
        },
        current: {
            description: observationData.features[0].properties.textDescription,
            temperature: cToF(observationData.features[0].properties.temperature.value)
        }
    });
}

const getCachedWeatherMeta = () => {
    const rawCachedData = localStorage.getItem('weatherMeta');

    if(rawCachedData !== null) {
        return JSON.parse(rawCachedData) as WeatherMeta;
    } else {
        return null;
    }
}

const getCachedWeatherData = () => {
    const rawCachedData = localStorage.getItem('weatherData');
    
    if(rawCachedData !== null) {
        return JSON.parse(rawCachedData) as WeatherData;
    } else {
        return null;
    }
}

export const getWeatherMeta = async () => {
    // get cached data (if any)
    const cachedWeatherMeta = getCachedWeatherMeta();

    // get current location (if possible)
    // const location = await getLocation();
    const location = {
        coords: {
            latitude: 37.79212008680284,
            longitude: -122.41721105286786
        }

        // cherry hill 39.92297731785307, -74.98600043159324
        // san francisco 37.79212008680284, -122.41721105286786
    };
    
    if(location === null) {
        if(cachedWeatherMeta !== null) {
            console.log("Using cached Weather Metadata!");
            return cachedWeatherMeta;
        } else {
            // Oh no! We can't get the location!
            console.log("Error: couldn't get location!");
            return null;
        }
    } else {
        // If our cached location matches our current location, use the cached one
        if(cachedWeatherMeta !== null &&
            cachedWeatherMeta.lat === location.coords.latitude &&
            cachedWeatherMeta.lng === location.coords.longitude
        ) {
            console.log("Using cached Weather Metadata!");
            return cachedWeatherMeta;
        } else {
            console.log("Loading new Weather Metadata!");
            // fetch new weather data
            const newWeatherMeta = await fetchNewWeatherMeta(location.coords.latitude, location.coords.longitude);
            
            // cache new data
            localStorage.setItem('weatherMeta', JSON.stringify(newWeatherMeta));

            return newWeatherMeta;
        }
    }
}

export const getWeatherData = async (weatherMeta: WeatherMeta, maxWeatherAge: number = 25 ) => {
    // get cached data (if any)
    const cachedWeatherData = getCachedWeatherData();

    if(cachedWeatherData !== null &&
        getMinutesBetweenDates(new Date(cachedWeatherData.lastUpdated), new Date()) < maxWeatherAge
    ) {
        console.log("Using cached weather data!");
        return cachedWeatherData;
    } else {
        console.log("Fetching new weather data!");
        // fetch new weather data
        const newWeatherData = await fetchNewWeatherData(weatherMeta);
        
        // cache new data
        localStorage.setItem('weatherData', JSON.stringify(newWeatherData));

        return newWeatherData;
    }
}
