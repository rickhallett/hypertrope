/**
 * RESTFUL ROUTING
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

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Account = require("../models/Account");

const router = express.Router();

const Workout = require("../models/Workout");
const newWorkout = require("../models/newWorkout");
const constants = require("../data/constants");

const utilities = require("../public/javascripts/utilities");
const nodeUtils = require("../utils/nodeUtils");

/**
 * CUSTOM MIDDLEWARE
 */

const middleWare = {};

middleWare.flash = function(req, res) {

};

middleWare.quotes = function(req, res, next) {
  res.sample = arr => arr[Math.floor(Math.random() * arr.length)];
  res.quotes = require("../data/quotes.json").quotes;
  next(null, res);
};

/**
 * USER CONTROLLER
 */

const userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  const sample = arr => arr[Math.floor(Math.random() * arr.length)];
  const quotes = require("../data/quotes.json").quotes;

  if (req.user && indexHitCount() < 1) {
    res.locals.user = req.user;
    req.flash("info", "Wecome to Hypertrope!");
  }

  res.render("index", {
    quote: sample(quotes),
    title: constants.SITE_NAME,
    flashMessages: req.flash()
  });
  //   res.render('index', { user : req.user });
};

// Go to registration page
userController.getRegister = function(req, res) {
  res.render("register", {
    flashMessages: req.flash(),
    quote: res.sample(res.quotes)
  });
};

// Post registration
userController.postRegister = function(req, res) {
  Account.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.render("register");
        // return res.render('index', {flashMessages: req.flash('warn', 'Unable to login') });
        // return res.render('index', { user : user });
      }

      passport.authenticate("local")(req, res, function() {
        //TODO: does this need to be here?
        res.locals.user = req.user;

        res.redirect("/");
      });
    }
  );
};

// Go to login page
userController.getLogin = function(req, res) {
  req.flash('info', 'this is a test');
  res.render("login", { 
    flashMessages: req.flash(),
    quote: res.sample(res.quotes)
  });
};

// Post login
userController.postLogin = function(req, res) {
  passport.authenticate("local")(req, res, function() {
    //TODO: does this need to be here?
    res.locals.user = req.user;

    res.redirect("/");
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

/**
 * ROUTES
 */

function indexHitCounter() {
  let counter = 0;
  return function() {
    return counter++;
  };
}

const indexHitCount = indexHitCounter();

// restrict index for logged in user only
router.get("/", userController.home);

// route to register page
router.get("/register", middleWare.quotes, userController.getRegister);

// route for register action
router.post("/register", userController.postRegister);

// route to login page
router.get("/login", middleWare.quotes, userController.getLogin);

// route for login action
router.post("/login", userController.postLogin);

// route for logout action
router.get("/logout", userController.logout);



/**
 * WORKOUT CONTROLLER
 */

const workoutController = {};

workoutController.getNew = function(req, res) {
  const exercises = require("../data/exercises.json").exercises;
  res.locals.user = req.user;
  res.render("newWorkout", {
    title: constants.SITE_NAME,
    menu_opts: exercises
  });
};

workoutController.postNew = function(req, res) {
  const workout = newWorkout(req);
  workout.calculateWork();

  workout.save(function(err) {
    if (err) {
      console.log("Error saving workouts");
      console.log(err);
    }

    res.redirect(`/workouts/${req.user.username}`);
  });
};

workoutController.getWorkouts = function(req, res) {
  const name = req.user.username;
  res.locals.user = req.user;

  const helpers = {
    capitaliseFirstChar: utilities.capitaliseFirstChar
  };

  Workout.find({ name: name }, function(err, workouts) {
    if (err) console.log("Error retrieving workouts");
    res.render("list-workouts", {
      name: name,
      workouts: workouts,
      helpers: helpers
    });
  });
};

/**
 * WORKOUT ROUTES
 */

router.get('/new', workoutController.getNew);

router.post('/new', workoutController.postNew);

router.get('/:name', workoutController.getWorkouts);

/**
 * INFORMATION CONTROLLER
 */

const informationController = {};

informationController.getInformation = function() {
  res.locals.user = req.user;
  res.render("information");
};


/**
 * INFORMATION ROUTES
 */

router.get('/information', informationController.getInformation);

module.exports = router;
