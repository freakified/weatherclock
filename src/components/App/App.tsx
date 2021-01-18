import React, { Component } from 'react';
import ClockTime from '../ClockTime/ClockTime';
import ClockDate from '../ClockDate/ClockDate';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import WeatherTemperature from '../WeatherTemperature/WeatherTemperature';
import { defaultSettings as settings } from '../../utils/settingsUtils';
import * as mockUtils from '../../mocks/mockUtils';
import { WeatherMeta, WeatherData, getWeatherMeta } from '../../utils/weatherUtils'
import { getMinutesBetweenDates } from '../../utils/timeUtils';
import './App.css';
import WeatherForecast from '../WeatherForecast/WeatherForecast';

interface AppProps {
    // No props yet!
}

interface AppState {
    weatherMeta?: WeatherMeta
    weatherData?: WeatherData
    currentObservations?: any

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
        const weatherMeta = await getWeatherMeta();
        console.log("Weather meta found!");
        console.log(weatherMeta);
        // this.fetchNewWeather();
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

    // Fetches the NWS weather metadata needed to fetch weather information
    // fetchWeatherMeta() {
    //     getLocation().then((position) => {
    //         // We got the location!
    //         mockUtils.getPointWithDelay().then((pointData) => {
    //             // We got the point data!
    //             mockUtils.getStationsWithDelay().then(
    //                 (stationsData) => {
    //                     this.setState((prevState) => ({
    //                         ...prevState,
    //                         weatherMeta: {
    //                             ...prevState.weatherMeta,
    //                             lat: position.coords.latitude,
    //                             lng: position.coords.longitude,
    //                             forecastURI: pointData.properties.forecast,
    //                             stationsURI: pointData.properties.observationStations,
    //                             observationURI: `https://api.weather.gov/stations/${stationsData.features[0].properties.stationIdentifier}/observations`,
    //                             stationId: stationsData.features[0].properties.stationIdentifier,
    //                             stationName: stationsData.features[0].properties.name
    //                         }
    //                     }));
    //                 }
    //             );
    //         })
    //     }).catch((err) => {
    //         console.log('Location get failed!');
    //     });
    // }

    // (forecastData) => {
    //     this.setState((prevState) => ({
    //     ...prevState,
    //     currentWeather,
    //     lastWeatherUpdateTime: prevState.currentTime
    // }))
    // });

    fetchNewWeather() {
        mockUtils.getForecastWithDelay().then((forecastData) => {
            mockUtils.getObservationsWithDelay().then((observationData) => {
                this.setState((prevState) => ({
                    ...prevState,
                    lastWeatherUpdateTime: prevState.currentTime,
                    weatherData: {
                        forecast: {
                            name: forecastData.properties.periods[0].name,
                            shortForecast: forecastData.properties.periods[0].shortForecast,
                            detailedForecast: forecastData.properties.periods[0].detailedForecast
                        },
                        current: {
                            description: observationData.properties.textDescription,
                            temperature: observationData.properties.temperature.value
                        }
                    }
                }))
            });
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}
    
export default App;
    