const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Account = require("../models/Account");

/**
 * CONTROLLER
 */

const authController = {};

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
userController.register = function(req, res) {
  res.render("register");
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
userController.login = function(req, res) {
  res.render("login");
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

// restrict index for logged in user only
function indexHitCounter() {
  let counter = 0;
  return function() {
    return counter++;
  };
}

const indexHitCount = indexHitCounter();

router.get("/", function(req, res, next) {});

// route to register page
router.get("/register", auth.register);

// route for register action
router.post("/register", auth.postRegister);

// route to login page
router.get("/login", auth.login);

// route for login action
router.post("/login", auth.postLogin);

// route for logout action
router.get("/logout", auth.logout);

module.exports = {};
