import mongoose from "mongoose";
import carsList from "./models/carslist.js";

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to DB
const db = mongoose.connect("mongodb://127.0.0.1:27017/CarsListCli", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add Car
const addCar = (car) => {
  carsList.create(car).then((car) => {
    console.info("New Car Added");
  });
};

// Find Car
const findCar = (name) => {
  // Make case insensitive
  const search = new RegExp(name, "i");
  carsList
    .find({ $or: [{ brand: search }, { model: search }] })
    .then((cars) => {
      console.info(cars);
      console.info(`${cars.length} matches`);
    });
};

// Update Car
const updateCar = (_id, car) => {
  carsList.findByIdAndUpdate(_id, car, { new: true }).then((updatedCar) => {
    console.info("Car Updated");
  });
};

// Remove Car
const removeCar = (_id) => {
  carsList.findByIdAndRemove(_id).then((car) => {
    console.info("Car Removed");
  });
};

// List all cars
const listAllCars = () => {
  carsList.find().then((cars) => {
    console.info(cars);
    console.info(`${cars.length} cars`);
  });
};

// Export All Methods
export { addCar, findCar, updateCar, removeCar, listAllCars };
