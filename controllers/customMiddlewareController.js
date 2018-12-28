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

module.exports = middleWare;