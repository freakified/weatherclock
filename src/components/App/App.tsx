import React, { Component } from 'react';
import ClockTime from '../ClockTime/ClockTime';
import ClockDate from '../ClockDate/ClockDate';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import WeatherTemperature from '../WeatherTemperature/WeatherTemperature';
import { defaultSettings as settings } from '../../utils/settingsUtils';
import * as mockUtils from '../../mocks/mockUtils';
import { WeatherMeta, WeatherData, getWeatherMeta, getWeatherData } from '../../utils/weatherUtils'
import './App.css';
import WeatherForecast from '../WeatherForecast/WeatherForecast';

interface AppProps {
    // No props yet!
}

interface AppState {
    weatherMeta?: WeatherMeta
    weatherData?: WeatherData

    currentTime: Date
}

class App extends Component<AppProps, AppState> {
    private timerID: number; 

    constructor(props: AppProps) {
        super(props);

        this.timerID = window.setInterval(() => this.updateTime(), 1000);
        this.state = {
            currentTime: new Date()
        };
    }
    
    render() {
        return (
            <div className="wc-App">
                
                <div className="wc-App-upperContainer">
                    <WeatherTemperature currentWeather={this.state.weatherData} />
                    <WeatherForecast currentWeather={this.state.weatherData} />
                </div>

                <div className="wc-App-flexSpacer"></div>
                
                <div className="wc-App-lowerContainer">
                    <ClockDate
                        currentTime={this.state.currentTime}
                    />
                    <div className="wc-App-spacer"></div>
                    <ClockTime
                        currentTime={this.state.currentTime}
                        use12HourTime={settings.use12HourMode}
                    />
                </div>

                <BackgroundImage
                    currentWeather={this.state.weatherData}
                    currentTime={this.state.currentTime} />
            </div>
        );
    }

    updateTime() {
        this.setState((prevState) => ({
            ...prevState,
            currentTime: new Date()
        }));
    }

    async componentDidMount() {
        // Get Weather metadata
        const weatherMeta = await getWeatherMeta();
        
        if(weatherMeta !== null) {
            this.setState((prevState) => ({
                ...prevState,
                weatherMeta
            }));

            const weatherData = await getWeatherData(weatherMeta);

            this.setState((prevState) => ({
                ...prevState,
                weatherData
            }));
        }
    }

    componentDidUpdate() {
        // Check if anything needs to be updated
        if(this.state.weatherMeta !== undefined ) {
            // Weather meta is totally undefined

            // Get the geolocation, then all the  
            // this.fetchWeatherMeta();
        } 

        // if(getMinutesBetweenDates(this.state.lastWeatherUpdateTime, this.state.currentTime) > settings.weatherUpdateInterval) {
        //     this.fetchNewWeather();
        // }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}
    
export default App;
    