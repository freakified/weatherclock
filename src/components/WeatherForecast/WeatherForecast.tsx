
import React, { FunctionComponent } from 'react';
import { WeatherData } from 'src/utils/weatherUtils';
import './WeatherForecast.css';

interface WeatherForecastProps {
    currentWeather?: WeatherData
}

const WeatherForecast: FunctionComponent<WeatherForecastProps> = ({currentWeather}) => {
    
    
    return(
        <div className="wc-WeatherForecast">
            <div className="wc-WeatherForecast-name">{ currentWeather?.forecast?.name }</div>
            <div className="wc-WeatherForecast-details">{ currentWeather?.forecast?.detailedForecast }</div>
        </div>
    );
}

export default WeatherForecast;
