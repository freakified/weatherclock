import React, { Component } from 'react';
import ClockTime from '../ClockTime/ClockTime';
import ClockDate from '../ClockDate/ClockDate';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import WeatherTemperature from '../WeatherTemperature/WeatherTemperature';
import { defaultSettings as settings } from '../../utils/settingsUtils';
import * as mockUtils from '../../utils/mockUtils';
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
    secondsSinceLastUpdate: number
}

class App extends Component<AppProps, AppState> {
    private timerID?: number; 

    constructor(props: AppProps) {
        super(props);

        this.state = {
            currentTime: new Date(),
            secondsSinceLastUpdate: 0
        };
    }
    
    render() {
        return (
            <div className="wc-App">
                
                { this.state.weatherData && 
                <div className="wc-App-upperContainer">
                    <WeatherTemperature weatherData={this.state.weatherData} />
                    <WeatherForecast weatherData={this.state.weatherData} />
                </div>}

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
                    weatherData={this.state.weatherData}
                    weatherMeta={this.state.weatherMeta}
                    currentTime={this.state.currentTime}
                    secondsSinceLastUpdate={this.state.secondsSinceLastUpdate} />
            </div>
        );
    }

    updateTime() {
        this.setState((prevState) => ({
            ...prevState,
            currentTime: new Date(),
            secondsSinceLastUpdate: prevState.secondsSinceLastUpdate + 1
        }));
    }

    async componentDidMount() {
        if(this.state.weatherMeta === undefined) {
            // Get Weather metadata
            const weatherMeta = await getWeatherMeta();
            
            if(weatherMeta !== null) {
                this.setState((prevState) => ({
                    ...prevState,
                    weatherMeta
                }));

                await this.updateWeather();
            }
        }

        this.timerID = window.setInterval(() => this.updateTime(), 1000);
    }

    async updateWeather() {
        if(this.state.weatherMeta !== undefined) {
            // Get weather info
            const weatherData = await getWeatherData(this.state.weatherMeta);

            this.setState((prevState) => ({
                ...prevState,
                weatherData,
                secondsSinceLastUpdate: 0
            }));
        }
    }

    async componentDidUpdate() {
        if(this.state.secondsSinceLastUpdate / 60 === settings.weatherUpdateInterval) {
            await this.updateWeather();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}
    
export default App;
    