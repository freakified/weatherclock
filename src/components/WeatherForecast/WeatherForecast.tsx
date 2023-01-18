
import React, { FunctionComponent } from 'react';
import { getMinutesBetweenDates } from 'src/utils/timeUtils';
import { WeatherData, WeatherMeta } from 'src/utils/weatherUtils';
import './WeatherForecast.css';

interface WeatherForecastProps {
    weatherData?: WeatherData,
    weatherMeta?: WeatherMeta
}

const WeatherForecast: FunctionComponent<WeatherForecastProps> = ({weatherData, weatherMeta}) => {
    const updateMinutesAgo = (weatherData?.lastUpdated) ? getMinutesBetweenDates(
        new Date(weatherData?.lastUpdated),
        new Date()
    ) : null;

    return(
        <div className="wc-WeatherForecast">
            <div className="wc-WeatherForecast-header">
                <div className="wc-WeatherForecast-name">{ weatherData?.forecast?.name }</div>
                <div className="wc-WeatherForecast-lastUpdated">{ `${weatherMeta?.stationName}, ${updateMinutesAgo} min ago` } </div>
            </div>
            <div className="wc-WeatherForecast-details">{ weatherData?.forecast?.detailedForecast }</div>
        </div>
    );
}

export default WeatherForecast;
