
import React, { FunctionComponent } from 'react';
import { getFormattedDate } from '../../utils/timeUtils';
import './ClockDate.css';

interface ClockDateProps {
    currentTime: Date
}

const ClockDate: FunctionComponent<ClockDateProps> = ({currentTime}) => {
    return(
        <div className="wc-ClockDate">
            <div className="wc-ClockDate-date">{ getFormattedDate(currentTime) }</div>
        </div>
    );
}

export default ClockDate;
