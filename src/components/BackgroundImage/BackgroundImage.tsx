
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDaypartFromTime, getNewBackground } from '../../utils/backgroundImageUtils';
import { WeatherData } from '../../utils/weatherUtils';
import { defaultSettings } from 'src/utils/settingsUtils';

import './BackgroundImage.css';

interface BackgroundImageProps {
    currentTime: Date
    secondsSinceLastUpdate: number
    weatherData?: WeatherData
}


const BackgroundImage: FunctionComponent<BackgroundImageProps> = ({currentTime, secondsSinceLastUpdate, weatherData}) => {
    const [backgroundImageURL, setBackgroundImageURL] = useState('');
    
    useEffect(() => {
        // todo: make this changable instead of using global default setting
        if(secondsSinceLastUpdate % (defaultSettings.backgroundImageInterval * 60) === 0) {
            if(weatherData !== undefined ) {
                const currentDaypart = getDaypartFromTime(currentTime, weatherData.lat, weatherData.lng);
                const currentWeather = weatherData.current.description || "Clear";
                const selectedImage = getNewBackground(currentDaypart, currentWeather);

                setBackgroundImageURL(`${process.env.PUBLIC_URL}/photos/${selectedImage}`);
                console.log(`Updated bg, Weather: ${currentWeather} Daypart: ${currentDaypart}`);
            }
        }
    }, [weatherData, currentTime, secondsSinceLastUpdate]);

    return(
        <div
            className="wc-BackgroundImage"
            style={{backgroundImage: `url('${backgroundImageURL}')`}}>
        </div>
    );
}

export default BackgroundImage;
