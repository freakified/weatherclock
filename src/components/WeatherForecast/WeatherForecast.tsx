
import React, { FunctionComponent } from 'react';
import { getMinutesBetweenDates } from 'src/utils/timeUtils';
import { WeatherData } from 'src/utils/weatherUtils';
import Textfit from '@namhong2001/react-textfit';

import './WeatherForecast.css';

interface WeatherForecastProps {
    weatherData?: WeatherData
}

const WeatherForecast: FunctionComponent<WeatherForecastProps> = ({weatherData}) => {
    const updateMinutesAgo = (weatherData?.lastUpdated) ? getMinutesBetweenDates(
        new Date(weatherData?.lastUpdated),
        new Date()
    ) : null;

    return(
        <div className="wc-WeatherForecast">
            <div className="wc-WeatherForecast-header">
                <div className="wc-WeatherForecast-name">{ weatherData?.forecast.name }</div>
                {/* <div className="wc-WeatherForecast-lastUpdated">{ `${weatherData?.station?.name}, ${updateMinutesAgo} min ago` } </div> */}
            </div>
            <Textfit max={28} className="wc-WeatherForecast-details">{ weatherData?.forecast?.detailedForecast }</Textfit>
        </div>
    );
}

export default WeatherForecast;
