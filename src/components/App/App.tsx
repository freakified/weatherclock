import React, { Component } from 'react';
import ClockTime from '../ClockTime/ClockTime';
import ClockDate from '../ClockDate/ClockDate';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import { defaultSettings as settings } from '../../utils/settingsUtils';
import { getWeatherWithDelay } from '../../mocks/mockUtils';
import { getMinutesBetweenDates } from '../../utils/timeUtils';
import './App.css';

interface AppProps {
    // No props yet!
}

interface AppState {
    currentWeather?: any
    currentTime: Date
    lastWeatherUpdateTime: Date
}

class App extends Component<AppProps, AppState> {
    private timerID: number; 

    constructor(props: AppProps) {
        super(props);

        this.timerID = window.setInterval(() => this.updateTime(), 1000);
        this.state = {
            lastWeatherUpdateTime: new Date(0),
            currentTime: new Date(),

        };
    }
    
    render() {
        return (
            <div className="wc-App">
                <div className="wc-App-upperContainer">
                    {/* <Weather /> */}
                    { this.state.currentTime.toString() }
                </div>
                
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
                    currentWeather={this.state.currentWeather}
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

    componentDidUpdate() {
        // Update weather if needed
        if(getMinutesBetweenDates(this.state.lastWeatherUpdateTime, this.state.currentTime) > settings.weatherUpdateInterval) {
            this.fetchNewWeather();
        }
    }

    fetchNewWeather() {
        // fetch('https://api.weather.gov/gridpoints/TOP/31,80/forecast')
        //     .then(response => response.json())
        //     .then(data => this.setState((prevState) => ({
        //         ...prevState,
        //         currentWeather: data,
        //         lastWeatherUpdateTime: prevState.currentTime
        //     })));
        getWeatherWithDelay(2000).then(
            data => this.setState((prevState) => ({
                ...prevState,
                currentWeather: data,
                lastWeatherUpdateTime: prevState.currentTime
            }))
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}
    
export default App;
    