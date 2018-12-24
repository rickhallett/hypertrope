// TODO: determine why using app.use with this export results in a 404

const express = require('express');
const router = express.Router();

/* Inform user re: workout submission. */
router.get('/post-success', function(req, res, next) {
    res.render('post-success');
});

router.get('/post-failure', function(req, res, next) {
    res.render('post-failure');
});

module.exports = router;