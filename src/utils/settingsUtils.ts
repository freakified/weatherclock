interface wcSettings {
    weatherUpdateInterval: number,
    backgroundImageInterval: number,
    use12HourTime: boolean,
    locale: string
}

export const defaultSettings: wcSettings = {
    weatherUpdateInterval: 30, // Update weather every 30 minutes
    backgroundImageInterval: 1, // Update background image every 5 minutes
    use12HourTime: true,
    locale: 'en-us'
};

export const getCurrentSettings = () => {
    // todo: add settings save/load
    return defaultSettings;
};
