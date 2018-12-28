const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Account = require("../models/Account");

const authController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render("index", { user: req.user });
};

// Go to registration page
// userController.register = function(req, res) {
//   res.render('register');
// };

// Post registration
userController.register = function(req, res) {
  Account.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.render("index");
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

// // Go to login page
// userController.login = function(req, res) {
//   res.render('login');
// };

// Post login
userController.login = function(req, res) {
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

module.exports = userController;
