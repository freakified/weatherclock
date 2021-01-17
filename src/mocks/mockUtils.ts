import mockNWSGeo from './mockNWSGeo.json';
import mockNWSWeather from './mockNWSWeather.json';

export const getGeoWithDelay = (delay: number) => {
    return new Promise<any>(
        resolve => setTimeout(() => resolve(mockNWSGeo), delay)
    );
}

export const getWeatherWithDelay = (delay: number) => {
    return new Promise<any>(
        resolve => setTimeout(() => resolve(mockNWSWeather), delay)
    );
}
