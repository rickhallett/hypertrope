/**
 * DEPENDENCEIS
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const config = require('./config');
const options = { useNewUrlParser: true };

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const workoutRouter = require('./routes/workouts')

const app = express();

/**
 * DATABASE
 */

mongoose.connect(config.mongoURI, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database initialised!')
});

/**
 * VIEW ENGINE
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * MIDDLEWARE
 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ROUTES
 */

app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/workout/*', workoutRouter);

/**
 * ERROR HANDLING
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
