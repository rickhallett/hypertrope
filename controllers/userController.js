const passport = require("passport");
const Account = require("../models/Account");
const constants = require("../data/constants");

const indexHitCounter = () => {
  let counter = 0;
  let methods = {};

  return {
    inc: () => counter++,
    get: () => counter,
    reset: () => counter = 0
  };
};

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
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        req.flash('warn', 'Unable to register. Contact your administrator');
        return res.render("register");
      }

      passport.authenticate("local")(req, res, function() {
        console.log('hit authenticate')
        res.locals.user = req.user;
        req.flash('info', 'You have registered and are now logged in.');
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

  Account.find({ username: req.body.username }, function(err, account){
    if(!account.length) {
      req.flash('warn', 'Incorrect username or password');
      res.redirect('login');
    }

    let username = account.username;
    console.log(`username: ${username}`);
    
    passport.authenticate("local")(req, res, function() {
      res.locals.user = req.user;
      res.redirect("/");
    });
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