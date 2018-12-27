const express = require('express');
const router = express.Router();

const constants = require('../data/constants');
// const utilities = require('../public/javascripts/utilities');
const nodeUtils = require('../utils/nodeUtils');

/**
 * RESTFUL ROUTING
 * 
Name	Path	HTTP Verb	Purpose	Mongoose Method
Index	/dogs	GET	List all dogs	Dog.find()
New	/dogs/new	GET	Show new dog form	N/A
Create	/dogs	POST	Create a new dog, then redirect somewhere	Dog.create()
Show	/dogs/:id	GET	Show info about one specific dog	Dog.findById()
Edit	/dogs/:id/edit	GET	Show edit form for one dog	Dog.findById()
Update	/dogs/:id	PUT	Update particular dog, then redirect somewhere	Dog.findByIdAndUpdate()
Destroy	/dogs/:id	DELETE	Delete a particular dog, then redirect somewhere	Dog.findByIdAndRemove()
 */

router.get('/', function(req, res, next) {
  const sample = arr => arr[Math.floor(Math.random() * arr.length)];
  const quotes = require('../data/quotes.json').quotes;
  res.locals.user = req.user;
  
  req.flash('info', 'Welcome!');

  res.render('index', { quote: sample(quotes), title: constants.SITE_NAME, flashMessages: req.flash() });
});

router.get('/information', nodeUtils.isAuthenticated, function(req, res, next) {
  res.locals.user = req.user;
  res.render('information');
});

module.exports = router;
