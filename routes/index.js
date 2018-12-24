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

  workout.save(function(err) {
    if(err) {
      res.redirect('post-failure');
    }
  });
  res.redirect('post-success');
});

router.get('/list/:name', function(req, res, next) {
  const name = req.params.name.toLowerCase();
  
  Workout.find({ name: name }, function(err, workouts) {
    if (err) console.log('Error retrieving workouts');
    // console.table(workouts)
    console.log(workouts)
    res.render('list-workouts', { name: name, workouts: workouts });
  });
  
});

router.get('/post-success', function(req, res, next) {
  res.render('post-success');
});

router.get('/post-failure', function(req, res, next) {
  res.render('post-failure');
});

module.exports = router;
