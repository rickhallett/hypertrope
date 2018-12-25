const express = require('express');
const router = express.Router();

const Workout = require('../models/Workout');
const newWorkout = require('../models/newWorkout');

/**
 * 
Name	Path	HTTP Verb	Purpose	Mongoose Method
Index	/dogs	GET	List all dogs	Dog.find()
New	/dogs/new	GET	Show new dog form	N/A
Create	/dogs	POST	Create a new dog, then redirect somewhere	Dog.create()
Show	/dogs/:id	GET	Show info about one specific dog	Dog.findById()
Edit	/dogs/:id/edit	GET	Show edit form for one dog	Dog.findById()
Update	/dogs/:id	PUT	Update particular dog, then redirect somewhere	Dog.findByIdAndUpdate()
Destroy	/dogs/:id	DELETE	Delete a particular dog, then redirect somewhere	Dog.findByIdAndRemove()
 */

router.get('/', function(req, res, next) {
  const sample = arr => arr[Math.floor(Math.random() * arr.length)];
  const quotes = require('../data/quotes.json').quotes;
  res.render('index', { quote: sample(quotes) });
})

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/workout/new', function(req, res, next) {
  const exercises = require('../data/exercises.json').exercises;
  res.render('newWorkout', { title: 'Project Hypertrope', menu_opts: exercises });
});

router.post('/workout/new', function(req, res, next) {
  const workout = newWorkout(req);
  console.log(workout)
  workout.save(function(err) {
    if(err) {
      console.log('Error recieving workouts');
    }
  });
  res.redirect(`/workouts/${req.body.name}`);
});

router.get('/workouts/:name', function(req, res, next) {
  const name = req.params.name.toLowerCase();
  
  Workout.find({ name: name }, function(err, workouts) {
    if (err) console.log('Error retrieving workouts');
    res.render('list-workouts', { name: name, workouts: workouts });
  });
  
});



module.exports = router;
