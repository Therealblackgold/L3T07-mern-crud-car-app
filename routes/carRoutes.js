// imports
const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsControllers");

// @route = /api/cars/
router
  .route("/")
  .get(carsController.getAllCars)
  .post(carsController.createNewCar);

// @route = /api/cars/updateMany
router.route("/updateMany").post(carsController.updateMany);

// @route = /api/cars/filter
router.route("/filter").get(carsController.getOlderCars);

// @route = /api/cars/someID
router
  .route("/:id")
  .put(carsController.updateCarById)
  .delete(carsController.deleteCarById);

module.exports = router;
