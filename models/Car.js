const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, "Please provide the model of the car"],
  },
  make: {
    type: String,
    required: [true, "Please provide the make of the car"],
  },
  owner: {
    type: String,
    required: [true, "Please provide the current owner of the car"],
  },
  registration: {
    type: String,
    required: [true, "Please provide the registration of the car"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide the car's current  owners address"],
  },
});

// create model
const Car = mongoose.model("Car", carSchema);

// export model
module.exports = Car;
