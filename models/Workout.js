const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: { type: String, default: 'Anonymous' },
    date: { type: Date, default: Date.now },
    exercises: {
        lift1: {
            name: String,
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 }
        },
        lift2: {
            name: String,
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 }
        },
        lift3: {
            name: String,
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 }
        }
    },
    comments: String
});

const Workout = new mongoose.model('Workout', workoutSchema);

module.exports = Workout;