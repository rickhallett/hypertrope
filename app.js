/**
 * DEPENDENCEIS
 */
require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const colors = require('colors');
const helpers = require('./utils/helpers');
const constants = require('./data/constants');
const router = require('./routes/routes');
const errorHandlers = require('./controllers/errorHandlers');

const app = express();
const consoleSpacer = '\n\n> Server Console Output:\n'.yellow;

/**
 * DATABASE
 */

const dbOptions = { useNewUrlParser: true };

mongoose.connect(
    process.env.MONGO_URI,
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
        secret: process.env.SESSION_KEY,
        store: new MongoStore({
            url: process.env.MONGO_URI,
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

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (process.env.NODE_ENV === 'development.local') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

/**
 * INITIALISE SERVER
 */

const port = process.env.PORT;
const host = process.env.HOST;

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
