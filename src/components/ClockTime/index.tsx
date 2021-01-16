
import React, { FunctionComponent } from 'react';

interface ClockTimeProps {
    currentTime: Date
}

const ClockTime: FunctionComponent<ClockTimeProps> = ({currentTime}) => {
    return(
        <div className="weatherClock_ClockTime">
            
        </div>
    );
}