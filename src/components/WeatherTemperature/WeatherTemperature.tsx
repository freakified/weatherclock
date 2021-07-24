
import React, { FunctionComponent } from 'react';
import { WeatherData } from 'src/utils/weatherUtils';
import './WeatherTemperature.css';

interface WeatherTemperatureProps {
    weatherData?: WeatherData
}

const WeatherTemperature: FunctionComponent<WeatherTemperatureProps> = ({weatherData}) => {
    
    
    return(
        <div className="wc-WeatherTemperature">
            <div className="wc-WeatherTemperature-currentTemp">{ weatherData?.current?.temperature }°</div>
        </div>
    );
}

export default WeatherTemperature;
