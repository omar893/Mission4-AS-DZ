import mongoose from "mongoose";
import carsList from "./models/carslist.js";
import { CARS } from "./mockDataGenerator.js";

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/CarsListCliTestData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Add Car
const addCar = (car) => {
  carsList.create(car).then((car) => {
    console.info("New Car Added");
    db.close();
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
      db.close();
    });
};

// Update Car
const updateCar = (_id, car) => {
  carsList.findByIdAndUpdate(_id, car, { new: true }).then((updatedCar) => {
    console.info("Car Updated");
    db.close();
  });
};

// Remove Car
const removeCar = (_id) => {
  carsList.findByIdAndRemove(_id).then((car) => {
    console.info("Car Removed");
    db.close();
  });
};

// List all cars
const listAllCars = () => {
  carsList.find().then((cars) => {
    console.info(cars);
    console.info(`${cars.length} cars`);
    db.close();
  });
};

const seedCars = () => {
  console.info('Seeding random cars...');
  const cars = CARS;
  carsList.insertMany(cars).then(() => {
    console.info(`Successfully added ${cars.length} Cars.`);
    db.close();
  })
  
};

// Export All Methods
export { addCar, findCar, updateCar, removeCar, listAllCars, seedCars};
