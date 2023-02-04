import React, { Component } from 'react';
import ClockTime from '../ClockTime/ClockTime';
import ClockDate from '../ClockDate/ClockDate';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import { getCurrentSettings } from '../../utils/settingsUtils';
import { WeatherData, getWeatherData } from '../../utils/weatherUtils'
import './App.css';
import WeatherForecast from '../WeatherForecast/WeatherForecast';

interface AppProps {
    // No props yet!
}

interface AppState {
    weatherData?: WeatherData
    currentTime: Date
    secondsSinceLastUpdate: number
}

class App extends Component<AppProps, AppState> {
    private timerID?: number; 
    private wakeLock?: WakeLockSentinel;

    constructor(props: AppProps) {
        super(props);

        this.state = {
            currentTime: new Date(),
            secondsSinceLastUpdate: 999999
        };
    }
    
    render() {
        return (
            <div className="wc-App" onClick={() => this.toggleFullScreen() } >
                
                { this.state.weatherData && 
                <div className="wc-App-upperContainer">
                    <WeatherCurrent weatherData={this.state.weatherData} />
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
                    />
                </div>

                <BackgroundImage
                    weatherData={this.state.weatherData}
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

    toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }

    componentDidMount() {
        // attempt to request wake lock
        this.requestWakeLock();
        
        // set auto update timer
        this.timerID = window.setInterval(() => this.updateTime(), 1000);
    }
    
    async requestWakeLock() {
        try {
            this.wakeLock = await navigator.wakeLock.request('screen');
            this.wakeLock.addEventListener('release', () => {
                console.log('Wake Lock was released');
            });
            console.log('Wake Lock is active');
        } catch (err: any) {
            console.error(`${err.name}, ${err.message}`);
        }
    };

    async updateWeather() {
        // Get weather info
        const weatherData = await getWeatherData();

        this.setState((prevState) => ({
            ...prevState,
            weatherData,
            secondsSinceLastUpdate: 0
        }));
    }

    async componentDidUpdate() {
        if(this.state.secondsSinceLastUpdate / 60 > getCurrentSettings().weatherUpdateInterval) {
            await this.updateWeather();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        this.wakeLock?.release();
        this.wakeLock = undefined;
    }
}
    
export default App;
    