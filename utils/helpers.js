// TODO: create a current Path helper method for the navbar active styling
capitaliseFirstChar = string => {
  const arr = string.split("");
  arr[0] = arr[0].toUpperCase();
  return arr.join("");
};

determineMongoURI = config => {
  switch (process.env.NODE_ENV) {
    case "development":
      return config.localMongoURI;
      break;
    case "test_production":
      return config.mongoURI;
      break;
    case "production":
      return process.env.MONGO_URI;
      break;
    default:
      break;
  }
};

determineSessionSecret = config => {
  switch (process.env.NODE_ENV) {
    case "development":
      return config.sessionSecret;
      break;
    case "test_production":
      return config.sessionSecret;
      break;
    case "production":
      return process.env.SESSION_SECRET;
      break;
    default:
      break;
  }
};

createExerciseMap = exerciseData => {
  let exerciseMap = {};
  exerciseData.forEach(el => {
    const { name: viewName, value: dbIdentifier } = el;
    exerciseMap[dbIdentifier] = viewName;
  });

  return exerciseMap;
};

sortExercises = exercises => {
  exercises.sort((a, b) =>
    a.name.toUpperCase().slice(0, 1) < b.name.toUpperCase().slice(0, 1) ? -1 : 1
  );

  let indexOfNA;
  exercises.forEach((exercise, index) => {
    if (exercise.value === "n/a") {
      indexOfNA = index;
    }
  });

  let first = exercises[0];
  let na = exercises[indexOfNA];
  exercises[0] = na;
  exercises[indexOfNA] = first;

  return exercises;
};

module.exports = {
  capitaliseFirstChar,
  determineMongoURI,
  determineSessionSecret,
  createExerciseMap,
  sortExercises
};
