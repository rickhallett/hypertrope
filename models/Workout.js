const { Schema, model } = require("mongoose");

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

WorkoutSchema.methods.calculateWork = function() {
  let work = 0;

  this.exercises.forEach(exercise => {
    if (exercise.sets !== undefined && exercise.reps !== undefined) {
      work += exercise.sets * exercise.reps * exercise.weight;
    }
  });

  this.totalWork = work;
};

const Exercise = new model("Exercise", ExerciseSchema);
const Workout = new model("Workout", WorkoutSchema);

module.exports = { Exercise, Workout };
