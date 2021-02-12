import { getDaypartFromTime } from './backgroundImageUtils';

test('Daypart calculation works', () => {
    // It's Greenwich!
    const lat = 51.4934;
    const lng = 0.0098;

    const lateNightDate = new Date("2020-01-01 02:00 GMT");
    const morningDate = new Date("2020-01-01 08:00 GMT");
    const middayDate = new Date("2020-01-01 12:00 GMT");
    const afternoonDate = new Date("2020-01-01 15:00 GMT");
    const eveningDate = new Date("2020-01-01 17:00 GMT");
    const nightDate = new Date("2020-01-01 20:00 GMT");

    expect(
        getDaypartFromTime(lateNightDate, lat, lng)
    ).toBe('Night');
  
    expect(
        getDaypartFromTime(morningDate, lat, lng)
    ).toBe('Morning');

    expect(
        getDaypartFromTime(middayDate, lat, lng)
    ).toBe('Midday');

    expect(
        getDaypartFromTime(afternoonDate, lat, lng)
    ).toBe('Afternoon');
  
    expect(
        getDaypartFromTime(eveningDate, lat, lng)
    ).toBe('Evening');

    expect(
        getDaypartFromTime(nightDate, lat, lng)
    ).toBe('Night');
});
