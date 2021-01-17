
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
            <div className="wc-ClockTime-hour">{ getFormattedHour(currentTime, use12HourTime) }</div>
            <div className="wc-ClockTime-separator"></div>
            <div className="wc-ClockTime-minute">{ getFormattedMinute(currentTime) }</div>
        </div>
    );
}

export default ClockTime;
