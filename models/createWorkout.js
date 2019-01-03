const { Exercise, Workout } = require("./Workout");

constructExercise = ({ name, sets, reps, weight }) => {
  return new Exercise({
    name: name,
    sets: sets,
    reps: reps,
    weight: weight
  });
};

constructExerciseArrayV2 = req => {
  const exercises = [];
  const storedKeys = [];
  let liftCount = 1;

  Object.keys(req.body).map(key => {
    let numberStrippedKey = key.slice(0, 4);
    for (let i = 1; i <= 15; i++) {
      if (
        req.body[`${numberStrippedKey}${i}`] &&
        `${numberStrippedKey}${i}` === `lift${liftCount}` &&
        !storedKeys.includes(key)
      ) {
        if (!storedKeys.includes(key)) {
          exercises.push(
            constructExercise({
              name: req.body[`lift${liftCount}`],
              sets: req.body[`sets${liftCount}`],
              reps: req.body[`reps${liftCount}`],
              weight: req.body[`weight${liftCount}`]
            })
          );
          liftCount++;
          storedKeys.push(key);
        }
      }
    }
  });

  return exercises;
};

createWorkout = req => {
  const exercises = constructExerciseArrayV2(req);
  return new Workout({
    name: req.user.username,
    date: req.body.date || new Date(),
    exercises: exercises,
    comments: req.body.comments
  });
};

module.exports = createWorkout;
