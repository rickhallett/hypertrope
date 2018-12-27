const express = require('express');
const router = express.Router();

const Workout = require('../models/Workout');
const newWorkout = require('../models/newWorkout');
const constants = require('../data/constants');

const utilities = require('../public/javascripts/utilities');
const nodeUtils = require('../utils/nodeUtils');

// router.get('/', function(req, res, next) {
//     res.send('what this doin here');
// });

router.get('/new', nodeUtils.isAuthenticated, function(req, res, next) {
  const exercises = require('../data/exercises.json').exercises;
  res.locals.user = req.user;
  res.render('newWorkout', { user: req.user, title: constants.SITE_NAME, menu_opts: exercises });
});

router.post('/new', nodeUtils.isAuthenticated, function(req, res, next) {
  const workout = newWorkout(req);
  workout.calculateWork();
  
  workout.save(function(err) {
    if(err) {
      console.log('Error saving workouts');
      console.log(err);
    }
    
    res.redirect(`/workouts/${req.user.username}`);
  });
  
});

router.get('/:name', nodeUtils.isAuthenticated, function(req, res, next) {
  const name = req.user.username;
  
  const helpers = {
    capitaliseFirstChar: utilities.capitaliseFirstChar
  };
  
  Workout.find({ name: name }, function(err, workouts) {
    if (err) console.log('Error retrieving workouts');
    res.render('list-workouts', { name: name, workouts: workouts, helpers: helpers });
  });
  
});

module.exports = router;