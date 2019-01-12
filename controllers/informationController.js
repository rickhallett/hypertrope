/**
 * INFORMATION CONTROLLER
 */

const informationController = {};

informationController.getInformation = (req, res) => {
    res.render('information');
};

module.exports = informationController;
