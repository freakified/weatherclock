
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import * as DaypartTags from '../data/imageTags/Dayparts';
import * as WeatherTags from '../data/imageTags/WeatherConditions';

class Daypart {
    private name: string;
    private hourBegin: number;
    private hourEnd: number;

    constructor(name: string, hourBegin: number, hourEnd: number) {
        this.name = name; 
        this.hourBegin = hourBegin;
        this.hourEnd = hourEnd;
    }

    /*
    Returns true if the daypart encompasses the current hour,
    false otherwise.
    */
    containsHour(hour: number) {
        if(hour >= this.hourBegin && hour <= this.hourEnd) {
            return true;
        } else {
            return false;
        }
    }

    getName() {
        return this.name;
    }

    getDuration() {
        return this.hourEnd - this.hourBegin;
    }
}

  /**
	 * Returns the name for the current day part based on the provided time
   **/
export const getDaypartFromTime = (currentTime: Date, lat: number, lng: number) => {
    // Get the hour and local timezone offset
    const hour = currentTime.getUTCHours();

    // let's just pretend fractional TZ offsets don't exist
    const localTZOffset = Math.floor(currentTime.getTimezoneOffset() / 60);

    const hourToUTC = (hour: number) => (hour - localTZOffset);
    
    // We begin with my vague approximations of when the day parts are
    // (note that we'll scale them based on sunrise and sunset later)
    const unscaledDayparts = [
        new Daypart('Night', hourToUTC(0), hourToUTC(5)),
        new Daypart('Morning', hourToUTC(6), hourToUTC(8)),
        new Daypart('Midday', hourToUTC(9), hourToUTC(14)),
        new Daypart('Afternoon', hourToUTC(15), hourToUTC(17)),
        new Daypart('Evening', hourToUTC(18), hourToUTC(20)),
        new Daypart('Night', hourToUTC(21), hourToUTC(23))
    ];

    // get the sunrise and sunset times
    const sunriseTime = getSunrise(lat, lng);
    const sunsetTime = getSunset(lat, lng);
                
    //round sunrise and sunset to the nearest hour
    //not as accurate, but much easier to fit into the existing hour-based system
    const sunriseHour = sunriseTime.getUTCHours(); // Round down (floor)
    const sunsetHour = sunsetTime.getUTCHours() + 1; // Round up (ciel)
    
    //now scale all the non-night day parts based on the sunrise/set hour
    const scaledDaylightLength = sunriseHour - sunsetHour;
    
    // Add all the non-night daypart lengths
    const daylightDaypartDuration = unscaledDayparts[1].getDuration() +
                                    unscaledDayparts[2].getDuration() +
                                    unscaledDayparts[3].getDuration() +
                                    unscaledDayparts[4].getDuration();
    

    const scaledDaylightConversionFactor = daylightDaypartDuration / scaledDaylightLength;
    
    const morningScaledDuration = Math.round(unscaledDayparts[1].getDuration() + scaledDaylightConversionFactor);
    // const middayScaledDuration = Math.round(unscaledDayparts[2].getDuration() + scaledDaylightConversionFactor);
    const afternoonScaledDuration = Math.round(unscaledDayparts[3].getDuration() + scaledDaylightConversionFactor);
    const eveningScaledDuration = Math.round(unscaledDayparts[4].getDuration() + scaledDaylightConversionFactor);
    
    const scaledDayparts = [
        new Daypart('Night'    , 0, sunriseHour - 1),
        new Daypart('Morning'  , sunriseHour, sunriseHour + morningScaledDuration),
        new Daypart('Midday'   , sunriseHour + morningScaledDuration + 1, (sunsetHour - 1) - eveningScaledDuration - 1 - afternoonScaledDuration - 1),
        new Daypart('Afternoon', (sunsetHour - 1) - eveningScaledDuration - 1 - afternoonScaledDuration, (sunsetHour - 1) - eveningScaledDuration - 1),
        new Daypart('Evening'  , (sunsetHour - 1) - eveningScaledDuration, sunsetHour - 1),
        new Daypart('Night'    , sunsetHour,  23)
    ];

    return scaledDayparts.find(daypart => daypart.containsHour(hour))?.getName();
};


/**
 * Returns the url for a wallpaper image matching the
 * specified hour and weather tag
 **/
export const getNewBackground = (daypartName = 'Midday', weatherCondition = 'Clear') => {  
    const availableImages = getImagesFromTags(daypartName, weatherCondition);
    const borrowedImages = getBorrowedImages(daypartName, weatherCondition);

    return getWallpaperImage(availableImages, borrowedImages);
}

const getImagesForDaypart = (daypartName: string) => {
    switch(daypartName) {
        case 'Afternoon':
            return DaypartTags.Afternoon;
        case 'Evening':
            return DaypartTags.Evening;
        case 'Midday':
            return DaypartTags.Midday;
        case 'Morning':
            return DaypartTags.Morning;
        case 'Night':
            return DaypartTags.Night;
        default:
            return [];
    }
}

const getImagesForWeatherCondition = (weatherCondition: string) => {
    switch(weatherCondition) {
        case 'Clear':
            return WeatherTags.Clear;
        case 'Cloudy':
            return WeatherTags.Cloudy;
        case 'Fog':
            return WeatherTags.Fog;
        case 'PartlyCloudy':
            return WeatherTags.PartlyCloudy;
        case 'Rain':
            return WeatherTags.Rain;
        case 'Snow':
            return WeatherTags.Snow;
        default:
            return [];
    }
}


/* returns a wallpaper image given a tag name for daypart and weather */
const getImagesFromTags = (daypartName: string, weatherCondition: string) => {
    const imagesForDaypart = getImagesForDaypart(daypartName);
    const imagesForWeather = getImagesForWeatherCondition(weatherCondition);

    // First, determine the set of images that matches the given criteria
    const matchingImages = imagesForDaypart.filter(el => imagesForWeather.includes(el));

    return matchingImages;
}

const getWallpaperImage = (availableImages: string[], borrowedImages: string[]) => {
    // merge the two image sets
    const allImages = Array.from(new Set([...availableImages, ...borrowedImages]));

    // return a random image
    return allImages[Math.floor(Math.random() * allImages.length)];
}

/*
allow "borrowing" from other tags in specified situations.  
if we're in a borrow situtation, this function will return the borrowable tag

Snow:
	Afternoon can borrow from Midday
	Morning can borrow from Midday

Fog:
	Evening can borrow from Afternoon

Rain: 
	Morning can borrow from Midday
	Afternoon can borrow from Midday

Overcast:
	Morning can borrow from Midday
	Evening can borrow from Afternoon
	Night can borrow from Clear (weather)

PartlyCloudy:
	Night can borrow from Clear (weather)
*/
const getBorrowedImages = (daypartName: string, weatherCondition: string) => {
    // wow this code is ugly, i'd refactor it but I don't really feel like it
    // TODO: refactor this 
    let borrowedDaypart = daypartName;
    let borrowedWeather = weatherCondition;

    switch (weatherCondition) {
        case 'Snow':
            if (daypartName === 'Afternoon') {
                borrowedDaypart = 'Midday';
            } else if (daypartName === 'Morning') {

            }
            break;
        case 'Fog':
            if (daypartName === 'Evening') {
                borrowedDaypart = 'Afternoon';
            }
            break;
        case 'Rain':
            if (daypartName === 'Morning' || daypartName === 'Afternoon') {
                borrowedDaypart = 'Midday';
            }
            break;
        case 'Overcast':
            if (daypartName === 'Morning') {
                borrowedDaypart = 'Midday';
            } else if (daypartName === 'Evening') {
                borrowedDaypart = 'Afternoon';
            } else if (daypartName === 'Night') {
                borrowedWeather = 'Clear';
            }
            break;
        case 'PartlyCloudy':
            if (daypartName === 'Night') {
                borrowedWeather = 'Clear';
            }
            break;
    }

    // get the "borrowed" images
    const borrowedImages = getImagesFromTags(borrowedDaypart, borrowedWeather);
  
    // now, filter that down to max 10 images (chosen randomly)
    return borrowedImages.sort((a, b) => (0.5 - Math.random())).slice(0, 10);
}
