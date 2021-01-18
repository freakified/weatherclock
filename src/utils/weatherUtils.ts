export interface WeatherMeta {
    // Determined via browser
    lat?: number
    lng?: number

    // Information from Point API
    forecastURI?: string
    stationsURI?: string

    // Information from Stations API
    stationId?: string
    stationName?: string
    observationURI?: string
}

export interface WeatherData {
    forecast?: {
        name: string
        shortForecast: string
        detailedForecast: string
    };
    current?: {
        description: string
        temperature: number
    }
}

// export const getWeatherMeta : WeatherMeta ()

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
        lat,
        lng,
        forecastURI: pointData.properties.forecast,
        stationsURI: pointData.properties.observationStations,
        observationURI: `https://api.weather.gov/stations/${stationsData.features[0].properties.stationIdentifier}/observations`,
        stationId: stationsData.features[0].properties.stationIdentifier,
        stationName: stationsData.features[0].properties.name
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

export const getWeatherMeta = async () => {
    // get cached data (if any)
    const cachedWeatherMeta = getCachedWeatherMeta();

    // get current location (if possible)
    const location = await getLocation();
    
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
    

    // mockUtils.getPointWithDelay().then((pointData) => {
    //     // We got the point data!
    //     mockUtils.getStationsWithDelay().then(
    //         (stationsData) => {
    //             this.setState((prevState) => ({
    //                 ...prevState,
    //                 weatherMeta: {
    //                     ...prevState.weatherMeta,
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude,
    //                     forecastURI: pointData.properties.forecast,
    //                     stationsURI: pointData.properties.observationStations,
    //                     observationURI: `https://api.weather.gov/stations/${stationsData.features[0].properties.stationIdentifier}/observations`,
    //                     stationId: stationsData.features[0].properties.stationIdentifier,
    //                     stationName: stationsData.features[0].properties.name
    //                 }
    //             }));
    //         }
    //     );
    // })
// }