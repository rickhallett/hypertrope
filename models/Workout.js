const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: { type: String, default: 'Anonymous' },
    date: { type: Date, default: Date.now },
    exercises: {
        lift1: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift2: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift3: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift4: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift5: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift6: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift7: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift8: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift9: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        },
        lift10: {
            name: { type: String, default: 'n/a'},
            sets: { type: Number, default: 0 },
            reps: { type: Number, default: 0 },
            weight: { type: Number, default: 0 }
        }
    },
    totalWork: { type: Number, default: 0 },
    comments: String
});

workoutSchema.methods.calculateWork = function() {
    
    let work = 0;
    for(lift in this.exercises) {
        if(this.exercises.hasOwnProperty(lift))
            if(this.exercises[lift].sets !== undefined)
                work += (this.exercises[lift].sets * this.exercises[lift].reps) * this.exercises[lift].weight
    }
    this.totalWork = work;
};

// console.log(workoutSchema);

const Workout = new mongoose.model('Workout', workoutSchema);

module.exports = Workout;