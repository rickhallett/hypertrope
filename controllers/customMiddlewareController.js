/**
 * CUSTOM MIDDLEWARE
 */

const middleWare = {};

middleWare.flash = function(req, res, next) {
  req.flash('info', 'this comes from middleware!');
  next(null, res);
};

middleWare.quotes = function(req, res, next) {
  res.sample = arr => arr[Math.floor(Math.random() * arr.length)];
  res.quotes = require("../data/quotes.json").quotes;
  next(null, res);
};

middleWare.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }

  req.flash('warn', 'Please log in to view this resource');
  res.render('/login', { flashMessages: req.flash() });
  
  // return res.status(401).json({
  //   error: "User not authenticated"
  // });
};

module.exports = middleWare;