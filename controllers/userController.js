const passport = require("passport");
const Account = require("../models/Account");
const { indexHitCount, desktopRestrictCount } = require("../utils/nodeUtils");
const { getRandomQuote } = require("../utils/helpers");

/**
 * USER CONTROLLER
 */

const userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  desktopRestrictCount.reset();

  if (req.user) {
    indexHitCount.inc();
  }

  if (indexHitCount.get() === 1 && req.user) {
    req.flash("info", "Welcome to Hypertrope!");
  }

  res.render("index", {
    quote: res.sample(res.quotes),
    flashMessages: req.flash()
  });
};

userController.desktopRestrict = function(req, res) {
  desktopRestrictCount.inc();
  if (desktopRestrictCount.get() > 1) {
    req.flash("warn", "You really do need to use a phone for this app.");
  }
  if (desktopRestrictCount.get() > 2) {
    req.flash("warn", "You can pout all you like. Mobiles only.");
  }
  res.render("desktopRestrict", { flashMessages: req.flash() });
};

// Go to registration page
userController.getRegister = function(req, res) {
  res.render("register", {
    quote: res.sample(res.quotes)
  });
};

// Post registration
userController.postRegister = function(req, res) {
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        req.flash("warn", "Unable to register. Contact your administrator");
        return res.render("register");
      }

      passport.authenticate("local")(req, res, function() {
        req.flash("info", "You have registered and are now logged in.");
        res.redirect("/");
      });
    }
  );
};

// Go to login page
userController.getLogin = function(req, res) {
  res.render("login", {
    quote: res.quote
  });
};

// Post login
userController.postLogin = function(req, res) {
  Account.find({ username: req.body.username }, function(err, account) {
    if (!account.length) {
      req.flash("error", "This username was not found. Please register.");
      res.redirect("login");
    }

    let username = account.username;

    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid username or password."
    })(req, res, function() {
      res.redirect("/");
    });
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  if (!req.user) {
    indexHitCount.reset();
    req.flash("info", "You have logged out successfully");
  } else {
    req.flash("warn", "Problem logging out. Please contact administrator");
  }
  res.render("index", {
    user: null,
    flashMessages: req.flash(),
    quote: res.quote
  });
};

module.exports = userController;
