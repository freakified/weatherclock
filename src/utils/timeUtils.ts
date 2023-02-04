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

export const getFormattedDate = (currentTime: Date) => {
    return currentTime.toLocaleDateString('en-us', { weekday: 'long', month:"long", day: 'numeric'});
}

export const getMinutesBetweenDates = (startDate: Date, endDate: Date) => {
    const durationMs = (endDate.getTime()) - (startDate.getTime());
    return Math.floor(durationMs / 60000);
}

export const getRoundedDate = (roundToMinutes: number, date: Date) => {
    const ms = 1000 * 60 * roundToMinutes;
    const roundedDate = new Date(Math.round(date.getTime() / ms) * ms);
  
    return roundedDate;
}
