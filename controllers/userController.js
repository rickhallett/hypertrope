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
const customMiddleware = require('./customMiddlewareController');

function indexHitCounter() {
  let counter = 0;
  let methods = {};

  methods.inc = () => {
    console.log('incremented hit counter');
    return counter++;
  };

  methods.get = () => {
    return counter;
  }

  methods.reset = () => {
    counter = 0;
  }

  return methods;
}

const indexHitCount = indexHitCounter();

/**
 * USER CONTROLLER
 */

const userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  
  const sample = arr => arr[Math.floor(Math.random() * arr.length)];
  const quotes = require("../data/quotes.json").quotes;
  
  if (req.user) {
    res.locals.user = req.user;
    indexHitCount.inc();
  }

  if(indexHitCount.get() === 1) {
    req.flash("info", 'Welcome to Hypertrope!');
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
  console.log('hit postRegister')
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      console.log('hit callback')
      if (err) {
        return res.render("register");
        // return res.render('index', {flashMessages: req.flash('warn', 'Unable to login') });
        // return res.render('index', { user : user });
      }

      passport.authenticate("local")(req, res, function() {
        console.log('hit authenticate')
        //TODO: does this need to be here?
        res.locals.user = req.user;

        res.redirect("/");
      });
    }
  );
};

// Go to login page
userController.getLogin = function(req, res) {
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
  if(!req.user){
    indexHitCount.reset();
    req.flash('info', 'You have logged out successfully');
  } else {
    req.flash('warn', 'Problem logging out. Please contact administrator');
  }
  res.redirect("/");
};

module.exports = userController;