// Car model
const Car = require("../models/Car");
// asyncHandler created to handle async functions without using try catch
const asyncHandler = require("../middleware/asyncHandler");
// Global Error response
const ErrorResponse = require("../utils/errorResponse");

//----------- GET ALL CARS CONTROLLER -------------//
exports.getAllCars = asyncHandler(async (req, res, next) => {
  // find all cars
  const cars = await Car.find();
  // send response
  res.status(200).json({
    success: true,
    data: cars,
  });
});

//------- GET CARS OLDER THAN FIVE YEARS CONTROLLER --------//
exports.getOlderCars = asyncHandler(async (req, res, next) => {
  // find cars with the model less or equal to 2017
  const cars = await Car.find({
    model: {
      $lte: 2017,
    },
  });
  // send response
  res.status(200).json({
    success: true,
    data: cars,
  });
});

//----------- CREATE A NEW CAR CONTROLLER -------------//
exports.createNewCar = asyncHandler(async (req, res, next) => {
  // create a new car with the req body
  const car = await Car.create(req.body);
  // send response
  res.status(200).json({
    success: true,
    data: car,
    message: "Car Created Successfully",
  });
});

//----------- UPDATE A CAR BY ID CONTROLLER -------------//
exports.updateCarById = asyncHandler(async (req, res, next) => {
  // finding cars by id found in the request params
  let car = await Car.findById(req.params.id);
  // if block to handle id error
  if (!car) {
    return next(
      new ErrorResponse(`Car with id ${req.params.id} was not found`, 404)
    );
  }
  // updating the car matching req params id
  car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    //return the updated version
    new: true,
    //run model validators when adding new values
    runValidators: true,
  });
  // send response
  res.status(201).json({
    success: true,
    data: car,
    message: "Car Updated Successfully",
  });
});

//----------- UPDATE A CAR BY ID CONTROLLER -------------//
exports.updateMany = asyncHandler(async (req, res, next) => {
  // declaring a variable request body owner
  let query = { owner: req.body.owner };
  // updateMany car addresses with the same owner
  Car.updateMany(query, { address: req.body.address }, (err, doc) => {
    if (err) {
      console.log("Something wrong");
      res.send({ message: "ERROR:Not Updated. " + err });
    }
    res.send({ message: "Address Updated Successfully" });
  });
});

//----------- DELETE A CAR BY ID CONTROLLER -------------//
exports.deleteCarById = asyncHandler(async (req, res, next) => {
  let car = await Car.findById(req.params.id);
  // if block id to handle errors
  if (!car) {
    return next(
      new ErrorResponse(`Car with id ${req.params.id} was not found`, 404)
    );
  }
  // delete car
  await car.remove();
  // send response
  res.status(200).json({
    success: true,
    data: {},
    message: "Car Deleted Successfully",
  });
});
