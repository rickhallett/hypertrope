/**
 * DEPENDENCEIS
 */
const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const createError = require('http-errors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const colors = require('colors');
const helpers = require('./utils/helpers');
const constants = require('./data/constants');
const router = require('./routes/routes');

const { keyConfig, serverConfig } = require('./config');

const app = express();
const consoleSpacer = '\n\n> Server Console Output:\n'.yellow;

/**
 * DATABASE
 */

const dbOptions = { useNewUrlParser: true };

mongoose.connect(
    keyConfig.determineMongoURI(),
    dbOptions
);

const db = mongoose.connection;

db.on(
    'error',
    console.error.bind(this, `Error connecting to database ${this.name}`)
);

db.once('open', function() {
    console.log(
        `\nDatabase: ${this.name} connected successfully on port ${
            this.port
        } @host ${this.host}${consoleSpacer}`.cyan
    );
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * AUTH MIDDLEWARE
 */

app.use(
    session({
        secret: keyConfig.determineSessionSecret(),
        store: new MongoStore({
            url: keyConfig.determineMongoURI(),
        }),
        saveUninitialized: false,
        resave: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

/**
 * CUSTOM MIDDLEWARE (for all requests)
 */

app.use((req, res, next) => {
    res.locals.helpers = helpers;
    res.locals.user = req.user || null;
    res.locals.flashMessages = req.flash();
    res.locals.currentPath = req.path;
    res.locals.title = constants.SITE_NAME;
    res.locals.colors = colors;
    res.locals.quote = helpers.getRandomQuote;
    next();
});
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

app.use('/', router);

/**
 * ERROR HANDLING
 */
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * INITIALISE SERVER
 */

const port = serverConfig.determinePort();
const host = serverConfig.determineHost();

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, host, (err) => {
    if (err) {
        console.log('\nError setting up server'.red);
        console.log(err);
    }

    if (!err) {
        console.log(`\nServer: listening on ${port}`.magenta);
    }
});

module.exports = app;
