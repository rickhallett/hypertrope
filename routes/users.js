const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/Account');

// router.post('/register', function(req, res, next) {
//     let newAccount = new Account({
//         username: req.body.username,
//         password: req.body.password
//     });

//     newAccount.save(function(err) {
//         if(err) return res.render('/');

//         passport.authenticate('local')(req, res, function(){
//             res.redirect('/');
//         });
//     });
// });

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);
            return res.render('index', { account: account, error: err });
        }

        const handler = passport.authenticate('local', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true, // allow flash messages
        });
        handler(req, res, next);
    });
});

module.exports = router;
