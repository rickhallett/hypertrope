const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.locals.user = req.user;
  req.flash('info', 'Welcome to Hypertrope!');
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

