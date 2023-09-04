import mongoose from "mongoose";

// Cars Schema
const CarsListSchema = new mongoose.Schema({
  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  color: { type: String },
  type: { type: String },
  imageURL: { type: String },
});

// Define and export
export default mongoose.model("CarsList", CarsListSchema);
