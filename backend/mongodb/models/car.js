const mongoose = require("mongoose");

const CarsListSchema = new mongoose.Schema({
  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  color: { type: String },
  type: { type: String },
  imageURL: { type: String },
});

module.exports = mongoose.model("CarsList", CarsListSchema);
