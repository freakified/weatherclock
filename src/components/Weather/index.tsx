import React, { Component } from 'react';


interface WeatherProps {
    // No props yet!
}

interface WeatherState {
    // time: Date
}
 
class Weather extends Component<WeatherProps, WeatherState> {
    // private timerID: number; 

    constructor(props: WeatherProps) {
        super(props);

        // this.timerID = window.setInterval(() => this.updateTime(), 1000);
    }
    
    render() {
        return(
            <p>
                I sure like weather lol
            </p>
        );
    }
}

export default Weather;