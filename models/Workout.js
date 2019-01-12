const mongoose = require('mongoose');
const exerciseData = require('../data/exercises.json').exercises;

const Model = mongoose.model;
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    name: { type: String, default: 'n/a' },
    sets: { type: Number, default: 0 },
    reps: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
});

const WorkoutSchema = new Schema({
    name: { type: String, default: 'Anonymous' },
    date: { type: Date, default: Date.now },
    exercises: [ExerciseSchema],
    totalWork: { type: Number },
    comments: String,
});

WorkoutSchema.methods.calculateWork = () => {
    const isDumbbellExercise = (name) => {
        let isDb = false;
        exerciseData.forEach((el) => {
            if (el.value === name) {
                isDb = el.db;
            }
        });
        return isDb;
    };

    let work = 0;

    this.exercises.forEach((exercise) => {
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

const Exercise = new Model('Exercise', ExerciseSchema);
const Workout = new Model('Workout', WorkoutSchema);

module.exports = { Exercise, Workout };
