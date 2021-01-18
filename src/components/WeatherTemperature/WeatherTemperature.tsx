
import React, { FunctionComponent } from 'react';
import { WeatherData } from 'src/utils/weatherUtils';
import './WeatherTemperature.css';

interface WeatherTemperatureProps {
    currentWeather?: WeatherData
}

const WeatherTemperature: FunctionComponent<WeatherTemperatureProps> = ({currentWeather}) => {
    
    
    return(
        <div className="wc-WeatherTemperature">
            <div className="wc-WeatherTemperature-currentTemp">{ currentWeather?.current?.temperature }°</div>
        </div>
    );
}

export default WeatherTemperature;
