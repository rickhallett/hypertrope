/**
 * RESTFUL ROUTING
 *
Name	Path	HTTP Verb	Purpose	Mongoose Method
Index	/dogs	GET	List all dogs	Dog.find()
New	/dogs/new	GET	Show new dog form	N/A
Create	/dogs	POST	Create a new dog, then redirect somewhere	Dog.create()
Show	/dogs/:id	GET	Show info about one specific dog	Dog.findById()
Edit	/dogs/:id/edit	GET	Show edit form for one dog	Dog.findById()
Update	/dogs/:id	PUT	Update particular dog, then redirect somewhere	Dog.findByIdAndUpdate()
Destroy	/dogs/:id	DELETE	Delete a particular dog, then redirect somewhere	Dog.findByIdAndRemove()
 */

const express = require("express");
const router = express.Router();
const colors = require("colors");

const userController = require("../controllers/userController");
const workoutController = require("../controllers/workoutController");
const informationController = require("../controllers/informationController");
const middleWare = require("../controllers/customMiddlewareController");

/**
 * USER ROUTES
 */

// restrict index for logged in user only
router.get("/", middleWare.quotes, userController.home);

// render a restriction page if user is not on a mobile
router.get("/preventDesktops", userController.desktopRestrict);

// route to register page
router.get("/register", middleWare.quotes, userController.getRegister);

// route for register action
router.post("/register", userController.postRegister);

// route to login page
router.get("/login", middleWare.quotes, userController.getLogin);

// route for login action
router.post("/login", userController.postLogin);

// route for logout action
router.get(
  "/logout",
  [middleWare.quotes, middleWare.isAuthenticated],
  userController.logout
);

/**
 * WORKOUT ROUTES
 */

router.get(
  "/workouts/new",
  middleWare.isAuthenticated,
  workoutController.getNew
);

router.post(
  "/workouts/new",
  middleWare.isAuthenticated,
  workoutController.postNew
);

router.get(
  "/workouts/:name",
  middleWare.isAuthenticated,
  workoutController.getWorkouts
);

router.get(
  "/workouts/:id/edit",
  middleWare.isAuthenticated,
  workoutController.getEditWorkout
);

router.post(
  "/workouts/:id/edit",
  middleWare.isAuthenticated,
  workoutController.postEditWorkout
);

router.post(
  "/workouts/:id/delete",
  middleWare.isAuthenticated,
  workoutController.deleteWorkout
);

/**
 * INFORMATION ROUTES
 */

router.get(
  "/information",
  middleWare.isAuthenticated,
  informationController.getInformation
);

/**
 * BIRTHDAY ROUTE
 */

router.get('/happy', (req, res) => {
   if(req.user.username === 'mynameisdad') {
       res.render('happyBirthday');
   } else {
       req.flash('error', 'It is not your birthday, chump!');
       res.render('index');
   }
});

console.log("\nLoaded all routes".yellow);

module.exports = router;
