import * as TimeUtils from './timeUtils';

test('Hour Formatting works', () => {
    expect(
        TimeUtils.getFormattedHour(new Date("2020-01-01 04:00"))
    ).toBe('4');

    expect(
        TimeUtils.getFormattedHour(new Date("2020-01-01 04:00"), true)
    ).toBe('4');

    expect(
        TimeUtils.getFormattedHour(new Date("2020-01-01 16:00"))
    ).toBe('16');

    expect(
        TimeUtils.getFormattedHour(new Date("2020-01-01 10:00"))
    ).toBe('10');

    expect(
        TimeUtils.getFormattedHour(new Date("2020-01-01 16:00"), true)
    ).toBe('4');

    expect(
        TimeUtils.getFormattedHour(new Date("2020-01-01 0:00"))
    ).toBe('0');

    expect(
        TimeUtils.getFormattedHour(new Date("2020-01-01 0:00"), true)
    ).toBe('12');
});

test('Minute formatting works', () => {
    expect(
        TimeUtils.getFormattedMinute(new Date("2020-01-01 0:00"))
    ).toBe('00');

    expect(
        TimeUtils.getFormattedMinute(new Date("2020-01-01 0:01"))
    ).toBe('01');

    expect(
        TimeUtils.getFormattedMinute(new Date("2020-01-01 0:30"))
    ).toBe('30');
});

test('AM/PM works', () => {
    expect(
        TimeUtils.getAmPm(new Date("2020-01-01 0:00"))
    ).toBe('AM');

    expect(
        TimeUtils.getAmPm(new Date("2020-01-01 12:00"))
    ).toBe('PM');

    expect(
        TimeUtils.getAmPm(new Date("2020-01-01 0:30"))
    ).toBe('AM');
});

test('Duration calculation works', () => {
    expect(
        TimeUtils.getMinutesBetweenDates(new Date("2020-01-01T00:00:00"), new Date("2020-01-01T00:30:00"))
    ).toBe(30);

    expect(
        TimeUtils.getMinutesBetweenDates(new Date("2020-01-01T00:00:00"), new Date("2020-01-01T00:05:00"))
    ).toBe(5);

    expect(
        TimeUtils.getMinutesBetweenDates(new Date("2020-01-01T00:00:00"), new Date("2020-01-01T00:00:00"))
    ).toBe(0);

    expect(
        TimeUtils.getMinutesBetweenDates(new Date("2020-01-01T00:59:00"), new Date("2020-01-01T00:00:00"))
    ).toBe(-59);
});