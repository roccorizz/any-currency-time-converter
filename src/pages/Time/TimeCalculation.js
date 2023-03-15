import moment from "moment-timezone";

export function getTimeDifference(fromTimezone, toTimezone) {
    const fromDatetime = moment.tz(moment(), fromTimezone);
    const toDatetime = moment.tz(moment(), toTimezone);
    const duration = moment.duration(toDatetime.diff(fromDatetime));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const sign = hours < 0 ? '-' : '+';
    return `${sign}${Math.abs(hours)}:${Math.abs(minutes).toString().padStart(2, '0')}`;
}
