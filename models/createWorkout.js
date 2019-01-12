const { Exercise, Workout } = require('./Workout');
const helpers = require('../utils/helpers');
const constants = require('../data/constants');

const constructExercise = ({ name, sets, reps, weight }) => {
    return new Exercise({
        name,
        sets,
        reps,
        weight,
    });
};

const constructExerciseArray = (req) => {
    const exercises = [];
    const storedKeys = helpers.Store();
    let liftCount = 1;

    Object.keys(req.body).map((key) => {
        const numberStrippedKey = key.slice(0, 4);
        for (let i = 1; i <= constants.MAX_EXERCISES; i++) {
            const keyWord = `${numberStrippedKey}${i}`;
            if (
                req.body[keyWord] &&
                keyWord === `lift${liftCount}` &&
                !storedKeys.has(key)
            ) {
                if (!storedKeys.has(key)) {
                    exercises.push(
                        constructExercise({
                            name: req.body[`lift${liftCount}`],
                            sets: req.body[`sets${liftCount}`],
                            reps: req.body[`reps${liftCount}`],
                            weight: req.body[`weight${liftCount}`],
                        })
                    );
                    liftCount++;
                    storedKeys.add(key);
                }
            }
        }
        return 0;
    });

    return exercises;
};

const createWorkout = (req) => {
    const exercises = constructExerciseArray(req);
    return new Workout({
        name: req.user.username,
        date: req.body.date || new Date(),
        exercises,
        comments: req.body.comments,
    });
};

module.exports = createWorkout;
