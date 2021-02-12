
import React, { FunctionComponent } from 'react';
import { getFormattedHour, getFormattedMinute } from '../../utils/timeUtils';
import './BackgroundImage.css';

interface BackgroundImageProps {
    currentTime: Date
    currentWeather?: any // I might write a proper weather interface later
}



const BackgroundImage: FunctionComponent<BackgroundImageProps> = ({currentTime}) => {
    return(
        <div
            className="wc-BackgroundImage"
            style={{backgroundImage: `url('${process.env.PUBLIC_URL}/photos/IMG_3289.jpg')`}}>
        </div>
    );
}

export default BackgroundImage;
