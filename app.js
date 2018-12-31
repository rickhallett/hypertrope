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
const appRoot = require("app-root-path");
const morgan = require("morgan");

const { 
  expressWinstonLogger, 
  expressWinstonConsoleLogger, 
  expressWinstonErrorLogger, 
  logfile, 
  inspect } = require('./config/winston');

const colors = require('colors');
const router = require("./routes/routes");

const app = express();
// app.set("env", "development");
app.set('env', 'production');

let config;
if (app.get("env") === "development") config = require("./secret");
const consoleSpacer =
  "\n\n> Server Console Output:\n".yellow;

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
    `\nDatabase: ${this.name} connected successfully on port ${this.port} @host ${
      this.host
    }${consoleSpacer}`.cyan
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

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'express_app.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

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
    cookie: {
      maxAge: null,
      expires: false,
    },
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
 * EXPRESS-WINSTON FILE LOGGER (must be before router)
 */

app.use(expressWinstonLogger);
app.use(expressWinstonConsoleLogger);

/**
 * ROUTES
 */

app.use("/", router);

/**
 * EXPRESS-WINSTON ERROR LOGGER (must be after router)
 */

// app.use(expressWinstonErrorLogger);


/**
 * ERROR HANDLING
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('error callback hit'.red)
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  console.log('error callback 2 hit'.red)
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  logfile.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

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
  if(err) {
    console.log('\nError setting up server'.red);
    console.log(err)
  }

  if (!err) {
    console.log(`\nServer: listening on ${port}`.magenta);
  }
});

module.exports = app;
