const restaurantsJSON = require('./rest_hours.json');

const DaysEnum = {
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4,
    'Sat': 5,
    'Sun': 6
};
const DAYS = 7;
const HOURS = 24 * 2; // half-hour increments

const range = (start, stop) => Array.from({ length: (stop - start) + 1}, (v, i) => start + i);

const convert12to48 = (inputTime) => {
    const [time, meridian] = inputTime.split(' ');
    let [hours, minutes] = time.split(':');

    hours = hours === '12' ? 0 : parseInt(hours, 10);
    hours = meridian === 'pm' ? hours + 12 : hours;
    minutes = minutes ? parseInt(minutes, 10) / 60 : 0;

    return Math.floor((hours + minutes) * 2);
};

const dateTimesStorage = Array.from(Array(DAYS), () => new Array(HOURS));

const addToRestaurants = (name, day, time) => {
    if (dateTimesStorage[day][time]) {
        dateTimesStorage[day][time].push(name);
    } else {
        dateTimesStorage[day][time] = [name];
    }
};

const parseDays = (dayIndices, currentDays) => {
    const firstDay = currentDays.slice(0,3);
    const lastDay = currentDays.slice(4,7);

    dayIndices.push(DaysEnum[firstDay]);

    if (lastDay !== '') {
        const lastDayIndex = DaysEnum[lastDay];

        dayIndices.push(...range(dayIndices[0] + 1, lastDayIndex));
    }

    return dayIndices;
};

const parseHours = (hours) => {
    let [open, close] = hours
        .split(' - ')
        .map((h) => convert12to48(h));

    const operatingHours = [];
    const wrappedHours = [];
    const latest = HOURS - 1;
    const earliest = 0;

    // The restaurant is open just before closing time, but
    // if you come right at closing time you won't get in.
    close = close === earliest ? latest : close - 1;

    if (close < open) {
        operatingHours.push(...range(open, latest));
        wrappedHours.push(...range(earliest, close));
    } else {
        operatingHours.push(...range(open, close));
    }

    return { operatingHours, wrappedHours };
};

const saveRestaurant = (r) => {
    r.times.forEach((t) => {
        const days = t
            .match(/([a-zA-Z]{3}[,-\s])+/g)
            .reduce(parseDays, []);
        const { operatingHours, wrappedHours } = t
            .match(/[\d:]+.*/g)
            .map(parseHours)[0];

        days.forEach((day) =>  {
            operatingHours.forEach((hour) => addToRestaurants(r.name, day, hour));

            wrappedHours.forEach((hour) => {
                const wrappedDay = day !== DaysEnum['Sun'] ? day + 1 : DaysEnum['Mon'];
                addToRestaurants(r.name, wrappedDay, hour)
            });
        });
    });
};

const loadRestaurants = () => {
    restaurantsJSON.forEach((r) => saveRestaurant(r));
};

const getAvailableRestaurants = (dateInput, timeInput) => {
    return dateTimesStorage[dateInput][timeInput];
};

module.exports = {
    loadRestaurants,
    getAvailableRestaurants
}
