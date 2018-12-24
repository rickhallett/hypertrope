const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    exercises: {
        lift1: {
            name: String,
            sets: Number,
            reps: Number
        },
        lift2: {
            name: String,
            sets: Number,
            reps: Number
        },
        lift3: {
            name: String,
            sets: Number,
            reps: Number
        }
    },
    comments: String
});

const Workout = new mongoose.model('Workout', workoutSchema);

module.exports = Workout;