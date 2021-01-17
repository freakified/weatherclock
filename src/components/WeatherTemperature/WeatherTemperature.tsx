
import React, { FunctionComponent } from 'react';
import './WeatherTemperature.css';

interface WeatherTemperatureProps {
    currentWeather: any // TODO type weather i guess
}

const WeatherTemperature: FunctionComponent<WeatherTemperatureProps> = ({currentWeather}) => {
    
    
    return(
        <div className="wc-WeatherTemperature">
            <div className="wc-WeatherTemperature-currentTemp">{ JSON.stringify(currentWeather) }°</div>
            {/* <div className="wc-WeatherTemperature-degreeSymbol"></div> */}
        </div>
    );
}

export default WeatherTemperature;
