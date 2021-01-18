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

export const getLocation = () => {
    return new Promise((resolve: PositionCallback, reject: PositionErrorCallback) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}

  