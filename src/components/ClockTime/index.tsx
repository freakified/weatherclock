
import React, { FunctionComponent } from 'react';
import { getFormattedHour, getFormattedMinute } from '../../utils/timeUtils';
import './ClockTime.css';

interface ClockTimeProps {
    currentTime: Date
    use12HourTime?: boolean
}

const ClockTime: FunctionComponent<ClockTimeProps> = ({currentTime, use12HourTime = false}) => {
    return(
        <div className="wc-ClockTime">
            <span className="wc-ClockTime-hour">{ getFormattedHour(currentTime, use12HourTime) }</span>
            <span className="wc-ClockTime-separator"></span>
            <span className="wc-ClockTime-minute">{ getFormattedMinute(currentTime) }</span>
        </div>
    );
}

export default ClockTime;
