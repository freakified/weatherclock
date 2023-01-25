
import React, { FunctionComponent } from 'react';
import { WeatherData } from 'src/utils/weatherUtils';
import './WeatherCurrent.css';

interface WeatherCurrentProps {
    weatherData?: WeatherData
}

const WeatherCurrent: FunctionComponent<WeatherCurrentProps> = ({weatherData}) => {
    
    
    return(
        <div className="wc-WeatherCurrent">
            <div className="wc-WeatherCurrent-currentTemp">{ weatherData?.current?.temperature }°</div>
            <div className="wc-WeatherCurrent-currentConditions">{ weatherData?.current?.description }</div>
        </div>
    );
}

export default WeatherCurrent;
