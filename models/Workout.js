const { Schema, model } = require("mongoose");
const exerciseData = require("../data/exercises.json").exercises;

const ExerciseSchema = new Schema({
  name: { type: String, default: "n/a" },
  sets: { type: Number, default: 0 },
  reps: { type: Number, default: 0 },
  weight: { type: Number, default: 0 }
});

const WorkoutSchema = new Schema({
  name: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now },
  exercises: [ExerciseSchema],
  totalWork: { type: Number },
  comments: String
});

var inventory = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 }
];

function isCherries(fruit) {
  return fruit.name === "cherries";
}

console.log(inventory.find(isCherries));
// { name: 'cherries', quantity: 5 }

WorkoutSchema.methods.calculateWork = function() {
  let work = 0;

  // exerciseName = (el, i, arr) => {
  //   return exerciseData[name] === name;
  // }

  isDumbbellExercise = name => {
    let isDb = false;
    exerciseData.forEach(el => {
      if (el.value === name) {
        isDb = el.db;
      }
    });
    return isDb;
  };

  this.exercises.forEach(exercise => {
    if (exercise.sets !== undefined && exercise.reps !== undefined) {
      if (isDumbbellExercise(exercise.name)) {
        work += exercise.sets * 2 * exercise.reps * exercise.weight;
      } else {
        work += exercise.sets * exercise.reps * exercise.weight;
      }
    }
  });

  this.totalWork = work;
};

const Exercise = new model("Exercise", ExerciseSchema);
const Workout = new model("Workout", WorkoutSchema);

module.exports = { Exercise, Workout };
