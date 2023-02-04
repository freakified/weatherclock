
import React, { FunctionComponent } from 'react';
import { getFormattedHour, getFormattedMinute, getAmPm } from '../../utils/timeUtils';
import { getCurrentSettings } from 'src/utils/settingsUtils';
import './ClockTime.css';

interface ClockTimeProps {
    currentTime: Date
}

const ClockTime: FunctionComponent<ClockTimeProps> = ({currentTime}) => {
    const use12HourTime = getCurrentSettings().use12HourTime;

    return(
        <div className="wc-ClockTime">
            <div className="wc-ClockTime-hour">{ getFormattedHour(currentTime, use12HourTime) }</div>
            <div className="wc-ClockTime-separator"></div>
            <div className="wc-ClockTime-minute">{ getFormattedMinute(currentTime) }</div>
            { use12HourTime && <div className="wc-ClockTime-ampm">{ getAmPm(currentTime) }</div>}
        </div>
    );
}

export default ClockTime;
