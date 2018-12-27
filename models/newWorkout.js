const Workout = require('../models/Workout');

module.exports = function(req){
    return new Workout({ 
        name: req.user.username,
        date: req.body.date || new Date(),
        exercises: {
          lift1: {
            name: req.body.lift1,
            sets: req.body.sets1,
            reps: req.body.reps1,
            weight: req.body.weight1
          },
          lift2: {
            name: req.body.lift2,
            sets: req.body.sets2,
            reps: req.body.reps2,
            weight: req.body.weight2
          },
          lift3: {
            name: req.body.lift3,
            sets: req.body.sets3,
            reps: req.body.reps3,
            weight: req.body.weight3
          },
          lift4: {
            name: req.body.lift4,
            sets: req.body.sets4,
            reps: req.body.reps4,
            weight: req.body.weight4
          },
          lift5: {
            name: req.body.lift5,
            sets: req.body.sets5,
            reps: req.body.reps5,
            weight: req.body.weight5
          },
          lift6: {
            name: req.body.lift6,
            sets: req.body.sets6,
            reps: req.body.reps6,
            weight: req.body.weight6
          },
          lift7: {
            name: req.body.lift7,
            sets: req.body.sets7,
            reps: req.body.reps7,
            weight: req.body.weight7
          },
          lift8: {
            name: req.body.lift8,
            sets: req.body.sets8,
            reps: req.body.reps8,
            weight: req.body.weight8
          },
          lift9: {
            name: req.body.lift9,
            sets: req.body.sets9,
            reps: req.body.reps9,
            weight: req.body.weight9
          },
          lift10: {
            name: req.body.lift10,
            sets: req.body.sets10,
            reps: req.body.reps10,
            weight: req.body.weight10
          },
        },
        comments: req.body.comments
      });
}

