
import { getSunrise, getSunset } from 'sunrise-sunset-js';

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

