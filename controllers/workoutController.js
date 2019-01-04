const { Workout } = require("../models/Workout");
const createWorkout = require("../models/createWorkout");
const helpers = require("../utils/helpers");
const constants = require("../data/constants");
const colors = require("colors");

/**
 * WORKOUT CONTROLLER
 */

const workoutController = {};

workoutController.getNew = function(req, res) {
  res.render("newWorkout", {
    menu_opts: helpers.getSortedExercises()
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
  const exerciseMap = res.locals.helpers.createExerciseMap(
    require("../data/exercises.json").exercises
  );

  const name = req.user.username;
  const utils = {
    capitaliseFirstChar: helpers.capitaliseFirstChar
  };

  Workout.find({ name: name }, function(err, workouts) {
    if (err) {
      req.flash("error", "Unable to retrieve workouts.");
      res.render("/");
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
  const id = req.params.id;

  const exerciseMap = res.locals.helpers.createExerciseMap(
    require("../data/exercises.json").exercises
  );

  Workout.findById(id, function(err, workout) {
    if (err) {
      req.flash("error", "Workout not found");
      res.render(`/workouts/${req.user.username}`);
    }

    res.render("editWorkout", {
      workout: workout,
      exerciseMap: exerciseMap,
      menu_opts: helpers.getSortedExercises()
    });
  });
};

workoutController.postEditWorkout = function(req, res) {
  const id = req.params.id;

  // constructExerciseArray = ({ name, sets, reps, weight }) => {

  // }

  // constructWorkoutObject = (req) => {

  // }

  const updatedWorkout = createWorkout(req);
  updatedWorkout.calculateWork();

  console.log(updatedWorkout);

  Workout.updateOne({ id: id }, { updatedWorkout }, function(err) {
    if (err) {
      console.log("There was a problem updating the workout.".red);
      req.flash(
        "error",
        "There was a problem deleting this workout. Please contact the site administrator."
      );
    }

    if (!err) {
      req.flash("success", "Workout updated successfully!");
    }

    res.redirect(`/workouts/${req.user.username}`);
  });
};

workoutController.deleteWorkout = function(req, res) {
  const id = req.params.id;

  Workout.deleteOne({ id: id }, function(err) {
    if (err) {
      console.log("There was a problem deleting the workout".red);
      req.flash(
        "error",
        "There was a problem updating this workout. Please contact the site administrator."
      );
    }

    if (!err) {
      req.flash("success", "Workout deleted!");
    }

    res.redirect(`/workouts/${req.user.username}`);
  });
};

module.exports = workoutController;
