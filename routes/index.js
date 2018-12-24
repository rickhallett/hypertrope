const express = require('express');
const router = express.Router();

const Workout = require('../models/Workout');

/* GET home page. */
router.get('/', function(req, res, next) {
  const exercises = [
    {
      value: "squat",
      name: "Squat"
    },
    {
      value: "deadlift",
      name: "Deadlift"
    },
    {
      value: "bench",
      name: "Bench Press"
    },
    {
      value: "military",
      name: "Military Press"
    },
    {
      value: "pulldown",
      name: "Lat Pull Downs"
    },
    {
      value: "legraise",
      name: "Leg Raises"
    },
    {
      value: "crunch",
      name: "Ab Crunches"
    }
  ];
  res.render('index', { title: 'Project Big Balls', menu_opts: exercises });
});

router.post('/', function(req, res, next) {
  let workout = new Workout({ 
    name: req.body.name,
    date: req.body.date,
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
  console.log(workout)
  workout.save(function(err) {
    if(err) {
      console.log(err);
      res.redirect('/post-failure');
    }
  });
  res.redirect('/post-success');
});

module.exports = router;
