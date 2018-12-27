const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/' + req.user.username);
  });

  router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   successFlash: 'Welcome to Hypertrope!',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = router;

