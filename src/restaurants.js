const restaurantsJSON = require('./assets/rest_hours.json');

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

// returns an array ranging from start to stop
const range = (start, stop) => Array.from({ length: (stop - start) + 1}, (v, i) => start + i);

// a 3-dimensional array that all restaurants are stored in
// the rows are days, ranging 0 to 6
// the columns are half-hours, ranging from 0 to 47
// the elements are arrays of the names of restaurants open at that particular time
const dateTimesStorage = Array.from(Array(DAYS), () => new Array(HOURS));

/**
 * Takes an input timestamp and returns the hour in 24-hour format,
 * multiplied by 2 for indexing the dateTimesStorage array
 * @param {String} inputTime a string in the format 'hh:mm [am|pm]'
 */
const convert12to48 = (inputTime) => {
    const [time, meridian] = inputTime.split(' ');
    let [hours, minutes] = time.split(':');

    hours = hours === '12' ? 0 : parseInt(hours, 10);
    hours = meridian === 'pm' ? hours + 12 : hours;
    minutes = minutes ? parseInt(minutes, 10) / 60 : 0;

    return Math.floor((hours + minutes) * 2);
};

/**
 * Stores a restaurant in the dateTimesStorage array by index day and time
 * @param {String} name name of the restaurant to be stored
 * @param {Int} day day index of restaurant to be stored
 * @param {Int} time half-hour index of restaurant to be stored
 */
const addToRestaurants = (name, day, time) => {
    if (dateTimesStorage[day][time]) {
        dateTimesStorage[day][time].push(name);
    } else {
        dateTimesStorage[day][time] = [name];
    }
};

/**
 * Takes the string of availabilities corresponding to a particular time,
 * and adds the corresponding day indices to the dayIndices array
 * @param {Array} dayIndices indices of days on which the restaurant is open
 * @param {String} currentDays listed open days of the restaurant
 */
const parseDays = (dayIndices, currentDays) => {
    const firstDay = currentDays.slice(0,3);
    const lastDay = currentDays.slice(4,7);

    dayIndices.push(DaysEnum[firstDay]);

    if (lastDay !== '') {
        const lastDayIndex = DaysEnum[lastDay];

        dayIndices.push(...range(DaysEnum[firstDay] + 1, lastDayIndex));
    }

    return dayIndices;
};

/**
 * Takes the string of availabilities corresponding to a particular time,
 * and returns an object containing the times before and after midnight
 * separated and converted to half-hour indices
 * @param {String} hours the listed availability of the restaurant
 */
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

/**
 * Takes a restaurant object and saves it to the dateTimesStorage array
 * @param {Object} r name and availabilities of a particular restaurant
 */
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

/**
 * Parses, saves, and returns the restaurants contained in the restaurantsJSON file
 */
const loadRestaurants = () => {
    restaurantsJSON.forEach((r) => saveRestaurant(r));

    return dateTimesStorage;
};

export default loadRestaurants
