
import React, { FunctionComponent } from 'react';
import { WeatherData } from 'src/utils/weatherUtils';
import './WeatherForecast.css';

interface WeatherForecastProps {
    weatherData?: WeatherData
}

const WeatherForecast: FunctionComponent<WeatherForecastProps> = ({weatherData}) => {
    
    
    return(
        <div className="wc-WeatherForecast">
            <div className="wc-WeatherForecast-name">{ weatherData?.forecast?.name }</div>
            <div className="wc-WeatherForecast-details">{ weatherData?.forecast?.detailedForecast }</div>
        </div>
    );
}

export default WeatherForecast;
