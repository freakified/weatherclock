import { createModuleResolutionCache } from "typescript";

export const getFormattedHour = (currentTime: Date, use12HourMode: boolean = false) => {
    return (use12HourMode ? (
        currentTime.getHours() % 12 || 12
    ) : currentTime.getHours()).toString();
};

export const getAmPm = (currentTime: Date) => {
    return currentTime.getHours() >= 12 ? 'PM' : 'AM';
}

export const getFormattedMinute = (currentTime: Date) => {
    const minutesString = currentTime.getMinutes().toString();

    return minutesString.length > 1 ? minutesString : '0' + minutesString;
}

export const getFormattedDay = (currentTime: Date) => {
    // One day, I will do proper internationalization. Today is not that day.
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return dayNames[currentTime.getDay()];
}

export const getFormattedDate = (currentTime: Date) => {
    const monthNames = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    return `${monthNames[currentTime.getMonth()]} ${currentTime.getDate()}`;
}
