const express = require("express");

/**
 * INFORMATION CONTROLLER
 */

const informationController = {};

informationController.getInformation = function(req, res) {
  res.locals.user = req.user;
  res.render("information");
};

module.exports = informationController;
