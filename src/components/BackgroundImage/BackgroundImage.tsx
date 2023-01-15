
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDaypartFromTime, getNewBackground } from '../../utils/backgroundImageUtils';
import { WeatherData, WeatherMeta } from '../../utils/weatherUtils';
import { defaultSettings } from '../../utils/settingsUtils';
import { getMinutesBetweenDates, getRoundedDate } from '../../utils/timeUtils';

import './BackgroundImage.css';

interface BackgroundImageProps {
    currentTime: Date
    secondsSinceLastUpdate: number
    weatherData?: WeatherData
    weatherMeta?: WeatherMeta
}


const BackgroundImage: FunctionComponent<BackgroundImageProps> = ({currentTime, secondsSinceLastUpdate, weatherData, weatherMeta}) => {
    const [backgroundImageURL, setBackgroundImageURL] = useState('');
    
    useEffect(() => {
        if(secondsSinceLastUpdate % 30 === 0) {
            if(weatherData !== undefined && weatherMeta !== undefined) {
                const currentDaypart = getDaypartFromTime(currentTime, weatherMeta.lat, weatherMeta.lng);
                const currentWeather = weatherData.current.description || "Clear";
                const selectedImage = getNewBackground(currentDaypart, currentWeather);

                setBackgroundImageURL(`${process.env.PUBLIC_URL}/photos/${selectedImage}`);
                console.log(`Updated bg, Weather: ${currentWeather} Daypart: ${currentDaypart}`);
            }
        }
    }, [weatherData, secondsSinceLastUpdate]);

    return(
        <div
            className="wc-BackgroundImage"
            style={{backgroundImage: `url('${backgroundImageURL}')`}}>
        </div>
    );
}

export default BackgroundImage;
