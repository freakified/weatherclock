import React, { Component } from 'react';
import ClockTime from '../ClockTime';
import { defaultSettings as settings } from '../../utils/settingsUtils';
import { getMinutesBetweenDates } from '../../utils/timeUtils';
import './App.css';

interface AppProps {
    // No props yet!
}

interface AppState {
    currentWeather?: JSON
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
                {/* <Weather /> */}
                { JSON.stringify(this.state.currentWeather) }
                <ClockTime
                    currentTime={this.state.currentTime}
                    use12HourTime={settings.use12HourMode}
                />
                { this.state.lastWeatherUpdateTime.toString() }
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
        fetch('https://api.weather.gov/gridpoints/TOP/31,80/forecast')
            .then(response => response.json())
            .then(data => this.setState((prevState) => ({
                ...prevState,
                currentWeather: data,
                lastWeatherUpdateTime: prevState.currentTime
            })));
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}
    
export default App;
    