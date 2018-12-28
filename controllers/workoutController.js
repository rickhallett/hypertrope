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
const customMiddleware = require('../controllers/customMiddlewareController');

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

module.exports = workoutController;