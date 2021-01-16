import React, { Component } from 'react';
import Clock from '../Clock';
import './App.css';

interface AppProps {
    // No props yet!
}

interface AppState {
    // No state yet!
}


class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }
    
    render() {
        return (
            <div className="wc-App">
                {/* <Weather /> */}
                <Clock />
            </div>
        );
    }
}
    
export default App;
    