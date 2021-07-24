
import React, { FunctionComponent, useState } from 'react';
import { getDaypartFromTime, getNewBackground } from '../../utils/backgroundImageUtils';
import { WeatherData, WeatherMeta } from '../../utils/weatherUtils';
import { defaultSettings } from '../../utils/settingsUtils';
import { getMinutesBetweenDates } from '../../utils/timeUtils';

import './BackgroundImage.css';

interface BackgroundImageProps {
    currentTime: Date
    weatherData?: WeatherData
    weatherMeta?: WeatherMeta
}

// const [lastUpdateTime, setLastUpdateTime] = useState(new Date(0));

const BackgroundImage: FunctionComponent<BackgroundImageProps> = ({currentTime, weatherData, weatherMeta}) => {
    // if(getMinutesBetweenDates(lastUpdateTime, new Date()) >)
    
    // setTimeSinceLastUpdate()
    if(weatherData !== undefined && weatherMeta !== undefined) {
        const currentDaypart = getDaypartFromTime(currentTime, weatherMeta.lat, weatherMeta.lng);
        const currentWeather = weatherData.current.description || "Clear";
        const selectedImage = getNewBackground(currentDaypart, currentWeather);

        const backgroundImage = `${process.env.PUBLIC_URL}/photos/${selectedImage}`;

        console.log(`Weather: ${currentWeather} Daypart: ${currentDaypart}`);

        return(
            <div
                className="wc-BackgroundImage"
                style={{backgroundImage: `url('${backgroundImage}')`}}>
            </div>
        );
    } else {
        return null;
        
    }
}

export default BackgroundImage;
