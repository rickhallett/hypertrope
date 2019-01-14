const passport = require('passport');
const _ = require('underscore');
const Account = require('../models/Account');
const { Workout } = require('../models/Workout');
const { indexHitCount, desktopRestrictCount } = require('../utils/nodeUtils');

/**
 * USER CONTROLLER
 */

const userController = {};

// Restrict access to root page
userController.home = (req, res) => {
    desktopRestrictCount.reset();

    if (req.user) {
        indexHitCount.inc();
    }

    if (indexHitCount.get() === 1 && req.user) {
        req.flash('success', 'Welcome to Hypertrope!');
    }

    res.render('index', {
        quote: res.sample(res.quotes),
        flashMessages: req.flash(),
    });
};

userController.desktopRestrict = (req, res) => {
    desktopRestrictCount.inc();
    if (desktopRestrictCount.get() > 1) {
        req.flash('warn', 'You really do need to use a phone for this app.');
    }
    if (desktopRestrictCount.get() > 2) {
        req.flash('warn', 'You can pout all you like. Mobiles only.');
    }
    res.render('desktopRestrict', { flashMessages: req.flash() });
};

// Go to registration page
userController.getRegister = (req, res) => {
    res.render('register', {
        quote: res.sample(res.quotes),
    });
};

// Post registration
userController.postRegister = (req, res) => {
    Account.register(
        new Account({ username: req.body.username }),
        req.body.password,
        (err) => {
            if (err) {
                req.flash(
                    'error',
                    'Unable to register. Contact your administrator'
                );
                return res.render('register');
            }

            passport.authenticate('local')(req, res, () => {
                req.flash(
                    'success',
                    'You have registered and are now logged in.'
                );
                res.redirect('/');
            });
        }
    );
};

// Go to login page
userController.getLogin = (req, res) => {
    res.render('login', {
        quote: res.quote,
    });
};

// Post login
userController.postLogin = (req, res) => {
    Account.find({ username: req.body.username }, (err, account) => {
        if (!account.length) {
            req.flash('error', 'This username was not found. Please register.');
            // TODO: can return exit callback function?
            return res.redirect('/login');
        }

        if (account.length) {
            passport.authenticate('local', {
                failureRedirect: '/login',
                failureFlash: 'Invalid username or password.',
            })(req, res, () => {
                res.redirect('/');
            });
        }
    });
};

// logout
userController.logout = (req, res) => {
    req.logout();
    if (!req.user) {
        indexHitCount.reset();
        req.flash('success', 'You have logged out successfully');
    } else {
        req.flash('error', 'Problem logging out. Please contact administrator');
    }
    res.render('index', {
        user: null,
        flashMessages: req.flash(),
        quote: res.quote,
    });
};

userController.showProfile = (req, res) => {
    const { username } = req.user;
    const findTotalKg = (workouts) =>
        _.reduce(workouts, (memo, reading) => memo + reading.totalWork, 0);
    Workout.find({ name: username }, (err, workouts) => {
        if (err) {
            req.flash('error', 'Unable to retrieve workouts.');
            res.render('/');
        }
        const totalKg = findTotalKg(workouts);
        res.render('userProfile', { username, totalKg });
    });
};

userController.getEditProfile = (req, res) => {
    res.redirect('/');
};

userController.postEditProfile = (req, res) => {
    res.redirect('/');
};

module.exports = userController;
