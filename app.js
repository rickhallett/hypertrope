/**
 * DEPENDENCEIS
 */
const fs = require("fs");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

const options = { useNewUrlParser: true };
const nodeUtils = require("./utils/nodeUtils");
const morgan = require("morgan");
const winston = require('./config/winston');
const colors = require('colors');

const godRouter = require("./routes/routes");

const app = express();
app.set("env", "development");
// app.set('env', 'production');

let config;
if (app.get("env") === "development") config = require("./secret");
const consoleSpacer =
  "\n\n=======================================================================\n\nServer Console Output:\n";

/**
 * DATABASE
 */
const mongoURI =
  app.get("env") === "development"
    ? config.dev_mongoURI
    : process.env.MONGO_URI;
mongoose.connect(
  mongoURI,
  options
);
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(this, `Error connecting to database ${this.name}`)
);
db.once("open", function() {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Database: ${this.name} connected successfully on port ${this.port} @host ${
      this.host
    }${consoleSpacer}`
  );
});

/**
 * VIEW ENGINE
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * MIDDLEWARE
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('combined', { stream: winston.stream }));
/**
 * AUTH MIDDLEWARE
 */
app.use(
  require("express-session")({
    secret:
      app.get("env") === "development"
        ? config.sessionSecret
        : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

/**
 * PASSPORT CONFIG
 */
const Account = require("./models/Account");
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


/**
 * WINSTON CONSOLE LOGGER (must be before router)
 * success logger
 * info logger
 * error logger
 * trace/silly logger
 */



/**
 * ROUTES
 */
// app.use('/', indexRouter);
// app.use('/auth', authRouter);
// app.use('/users', usersRouter);
// app.use('/workouts', workoutRouter);
app.use("/", godRouter);

/**
 * WINSTON ERROR LOGGER (must be after router)
 */




/**
 * ERROR HANDLING
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/**
 * INITIALISE SERVER
 */
//Get port from environment and store in Express.
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, function(err) {
  if (!err) {
    winston.debug(`Server listening on ${port}`);
  }
});

const t = {
  fds: [1, 2, 3, [1, 2, {name: 'ksksks'}]],
  fdds: {
    fdd: {
      sjssj: {
        name: 'skdfksdfksdf'
      }
    }
  }
}

module.exports = app;
