const express = require("express");

/**
 * INFORMATION CONTROLLER
 */

const informationController = {};

informationController.getInformation = function(req, res) {
  res.render("information");
};

module.exports = informationController;
