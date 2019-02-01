// TODO: create a current Path helper method for the navbar active styling
const capitaliseFirstChar = (string) => {
    const arr = string.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
};

const createExerciseMap = (exerciseData) => {
    const exerciseMap = {};
    exerciseData.forEach((el) => {
        const { name: viewName, value: dbIdentifier } = el;
        exerciseMap[dbIdentifier] = viewName;
    });

    return exerciseMap;
};

const createTypeMap = (exerciseData) => {
    const typeMap = {};
    exerciseData.forEach((el) => {
        const { value: exerciseName, type } = el;
        typeMap[exerciseName] = type;
    });

    return typeMap;
};

const sortExercises = (exercises) => {
    let placeholder;
    const withoutNA = exercises.filter((exercise) => {
        if (exercise.value === 'n/a') {
            placeholder = exercise;
            return false;
        }
        return exercise;
    });

    withoutNA.sort((a, b) =>
        a.name.toUpperCase().slice(0, 1) < b.name.toUpperCase().slice(0, 1)
            ? -1
            : 1
    );

    if (placeholder) withoutNA.unshift(placeholder);
    return withoutNA.slice();
};

const getSortedExercises = () => {
    const { exercises } = require('../data/exercises.json');
    return sortExercises(exercises);
};

const getRandomQuote = () => {
    const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const { quotes } = require('../data/quotes.json');
    return sample(quotes);
};

const keyIsPresent = (obj, key) => (obj[key] ? obj[key] : null);

const Store = () => {
    let storage = [];

    return {
        get: () => storage,
        has: (item) => storage.includes(item),
        add: (item) => storage.push(item),
        reset: () => (storage = []),
    };
};

const trimDate = (date) => date.toDateString();

const exerciseSelectorTextArray = [
    '-- Please choose an option--',
    'One exercise',
    'Two exercises',
    'Three exercises',
    'Four exercises',
    'Five exercises',
    'Six exercises',
    'Seven exercises',
    'Eight exercises',
    'Nine exercises',
    'Ten exercises',
    'Eleven exercises',
    'Twelve exercises',
    'Thirteen exercises',
    'Fourteen exercises',
    'Fifteen exercises',
];

module.exports = {
    capitaliseFirstChar,
    createExerciseMap,
    getSortedExercises,
    getRandomQuote,
    Store,
    trimDate,
    exerciseSelectorTextArray,
    createTypeMap,
};
