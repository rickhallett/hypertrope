/**
 * DEPENDENCEIS
 */
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const flash = require('connect-flash');

const config = require('./secret');
const options = { useNewUrlParser: true };
const nodeUtils = require('./utils/nodeUtils');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const workoutRouter = require('./routes/workouts')


const app = express();
app.set('env', 'development');

/**
 * DATABASE
 */
const mongoURI = app.get('env') === 'development' ? config.dev_mongoURI : config.mongoURI;
mongoose.connect(mongoURI, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('\x1b[33m%s\x1b[0m', `Database: ${this.name} connected successfully on port ${this.port} @host ${this.host}`);
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
app.use(cookieParser(config.sessionSecret));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * AUTH MIDDLEWARE
 */
app.use(require('express-session')({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(flash());

/**
 * PASSPORT CONFIG
 */
const Account = require('./models/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


/**
 * ROUTES
 */
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/workouts', workoutRouter);

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

/**
 * INITIALISE SERVER
 */
//Get port from environment and store in Express.
const port = (process.env.PORT || '3000');
app.set('port', port);


// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, function(err) {
  if(!err) {
    console.log(`Server listening on ${port}`);
  }
});

module.exports = app;
