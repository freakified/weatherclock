import { getMinutesBetweenDates } from './timeUtils';

export interface WeatherData {
    lastUpdated: Date
    lat: number
    lng: number
    mapClickURI: string
    station: {
        id: string
        name: string
    };
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

const fetchNewWeatherData = async (lat: number, lng: number) => {
    const mapClickURI =  `https://forecast.weather.gov/MapClick.php?lat=${lat}&lon=${lng}&unit=0&lg=english&FcstType=json`;

    // Get forecast from unofficial MapClick NWS API
    // Note that we're not using the official API endpoints, because their current observations is super flaky
    const mapClickResponse = await fetch(mapClickURI);
    const mapClickData = await mapClickResponse.json();

    // Return filled-out WeatherData
    return({
        lastUpdated: new Date(),
        lat,
        lng,
        mapClickURI,
        station : {
            id: mapClickData.currentobservation.id,
            name: mapClickData.currentobservation.name,
        },
        forecast: {
            name: mapClickData.time.startPeriodName[0],
            shortForecast: mapClickData.data.weather[0],
            detailedForecast: mapClickData.data.text[0]
        },
        current: {
            description: mapClickData.currentobservation.Weather,
            temperature: mapClickData.currentobservation.Temp
        }

    });
}

const getCachedWeatherData = () => {
    const rawCachedData = localStorage.getItem('weatherData');
    
    if(rawCachedData !== null) {
        return JSON.parse(rawCachedData) as WeatherData;
    } else {
        return null;
    }
}

export const getWeatherData = async (maxWeatherAge: number = 25) => {
    // get cached data (if any)
    const cachedWeatherData = getCachedWeatherData();

    // get current location (if possible)
    // const location = await getLocation();
    const location = {
        // cherry hill
        // coords: {
        //     latitude: 39.92297731785307,
        //     longitude: -74.98600043159324
        // }
        // san francisco
        coords: {
            latitude: 37.79212008680284,
            longitude: -122.41721105286786
        }
    };
    
    if(location === null) {
        if(cachedWeatherData !== null) {
            console.log("Using cached weather data!");
            return cachedWeatherData;
        } else {
            // Oh no! We can't get the location!
            console.log("Error: couldn't get location!");
            return undefined;
        }
    } else {
        // If our cached location matches our current location, consider using the cached one
        if(cachedWeatherData !== null &&
            cachedWeatherData.lat === location.coords.latitude &&
            cachedWeatherData.lng === location.coords.longitude &&
            getMinutesBetweenDates(new Date(cachedWeatherData.lastUpdated), new Date()) < maxWeatherAge
        ) {
            console.log("Cached weather location matches, and is relatively recent; using cached weather data.");
            
            return cachedWeatherData;
        } else {
            console.log("Loading new weather data!");
            // fetch new weather data
            const newWeatherData = await fetchNewWeatherData(location.coords.latitude, location.coords.longitude);
            
            // cache new data
            localStorage.setItem('weatherData', JSON.stringify(newWeatherData));

            return newWeatherData;
        }
    }
}
