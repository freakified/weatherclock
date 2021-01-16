import React, { Component } from 'react';


interface ClockProps {
    // No props yet!
}

interface ClockState {
    time: Date
}
 
class Clock extends Component<ClockProps, ClockState> {
    private timerID: number; 

    constructor(props: ClockProps) {
        super(props);

        this.timerID = window.setInterval(() => this.updateTime(), 1000);
        this.state ={
            time: new Date()
        };
    }

    updateTime() {
        this.setState({
            time: new Date()
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    render() {
        return(
            <p>
                The current time is {this.state.time?.toLocaleTimeString()}
            </p>
        );
    }
}

export default Clock;