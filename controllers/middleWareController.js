const helpers = require('../utils/helpers');

/**
 * CUSTOM MIDDLEWARE
 */

const middleWareController = {};

middleWareController.flash = (req, res, next) => {
    req.flash('info', 'this comes from middleware!');
    next(null, res);
};

middleWareController.quotes = (req, res, next) => {
    res.sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
    res.quotes = require('../data/quotes.json').quotes;
    res.quote = helpers.getRandomQuote();
    next(null, res);
};

middleWareController.isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }

    req.flash('warn', 'Please log in to view this resource');
    res.render('login', {
        flashMessages: req.flash(),
        quote: helpers.getRandomQuote(),
    });
};

module.exports = middleWareController;
