const express = require("express");
const { Workout } = require("../models/Workout");
const createWorkout = require("../models/createWorkout");
const constants = require("../data/constants");
const helpers = require("../utils/helpers");
const customMiddleware = require("../controllers/customMiddlewareController");

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
  const workout = createWorkout(req);
  workout.calculateWork();

  workout.save(function(err) {
    if (err) {
      console.log("Error saving workouts".red);
      console.log(err);
    }

    res.redirect(`/workouts/${req.user.username}`);
  });
};

workoutController.getWorkouts = function(req, res) {
  let exerciseData = require("../data/exercises.json").exercises;
  let exerciseMap = {};

  exerciseData.forEach(el => {
    const { name: viewName, value: dbIdentifier } = el;
    exerciseMap[dbIdentifier] = viewName;
  });

  const name = req.user.username;
  res.locals.user = req.user;

  const utils = {
    capitaliseFirstChar: helpers.capitaliseFirstChar
  };

  Workout.find({ name: name }, function(err, workouts) {
    if (err) {
      req.flash("error", "Unable to retrieve workouts.");
      res.render("/", { flashMessages: req.flash() });
    }
    res.render("listWorkouts", {
      name: name,
      workouts: workouts,
      helpers: utils,
      exerciseMap: exerciseMap
    });
  });
};

workoutController.getEditWorkout = function(req, res) {
  const id = req.body.id;
  Workout.findById(id, function(err, workout) {
    if (err) {
      req.flash("error", "Workout not found");
      res.render(`/workouts/${req.user.username}`);
    }

    res.render("editWorkout", { workout: workout });
  });
};

workoutController.postEditWorkout = function(req, res) {};

workoutController.deleteWorkout = function(req, res) {};

module.exports = workoutController;
