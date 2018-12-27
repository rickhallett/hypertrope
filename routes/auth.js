const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.locals.user = req.user;
  const sample = arr => arr[Math.floor(Math.random() * arr.length)];
  const quotes = require('../data/quotes').quotes;

  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

