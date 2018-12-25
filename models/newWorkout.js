const Workout = require('../models/Workout');

module.exports = function(req){
    return new Workout({ 
        name: req.body.name.toLowerCase().trim(),
        date: req.body.date || new Date(),
        exercises: {
          lift1: {
            name: req.body.lift1,
            sets: req.body.sets1,
            reps: req.body.reps1
          },
          lift2: {
            name: req.body.lift2,
            sets: req.body.sets2,
            reps: req.body.reps2
          },
          lift3: {
            name: req.body.lift3,
            sets: req.body.sets3,
            reps: req.body.reps3
          }
        },
        comments: req.body.comments
      });
}

