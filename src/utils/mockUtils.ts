import mockNWSPoint from '../data/mocks/mockNWSPoint.json';
import mockNWSForecast from '../data/mocks/mockNWSForecast.json';
import mockNWSStations from '../data/mocks/mockNWSStations.json';
import mockNWSObservations from '../data/mocks/mockNWSObservations.json';

const DEFAULT_DELAY = 2000;

// Mocks call to https://api.weather.gov/points/39.9226,-74.9863
export const getPointWithDelay = (delay: number = DEFAULT_DELAY) => {
    return new Promise<any>(
        resolve => setTimeout(() => resolve(mockNWSPoint), delay)
    );
}

// Mocks call to https://api.weather.gov/gridpoints/PHI/55,74/stations
export const getStationsWithDelay = (delay: number = DEFAULT_DELAY) => {
    return new Promise<any>(
        resolve => setTimeout(() => resolve(mockNWSStations), delay)
    );
}

// Mocks call to https://api.weather.gov/gridpoints/PHI/55,74/forecast
export const getForecastWithDelay = (delay: number = DEFAULT_DELAY) => {
    return new Promise<any>(
        resolve => setTimeout(() => resolve(mockNWSForecast), delay)
    );
}

// Mocks call to https://api.weather.gov/stations/KMYZ/observations
export const getObservationsWithDelay = (delay: number = DEFAULT_DELAY) => {
    return new Promise<any>(
        resolve => setTimeout(() => resolve(mockNWSObservations), delay)
    );
}
