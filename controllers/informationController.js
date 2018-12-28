const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const Account = require("../models/Account");

const router = express.Router();

const Workout = require("../models/Workout");
const newWorkout = require("../models/newWorkout");
const constants = require("../data/constants");

const utilities = require("../public/javascripts/utilities");
const nodeUtils = require("../utils/nodeUtils");
const customMiddleware = require('../controllers/customMiddlewareController');

/**
 * INFORMATION CONTROLLER
 */

const informationController = {};

informationController.getInformation = function(req, res) {
  res.locals.user = req.user;
  res.render("information");
};

module.exports = informationController;