import React, { useState } from "react";
import axios from "axios";
import carsData from "./cars.json";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarCar, setSimilarCar] = useState(null);

  const handleImageChange = (event) => {
    // Updates the selectedImage state with the image file.
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    //Checks if image was selected, if not, console no image selected
    try {
      if (!selectedImage) {
        console.log("No image selected.");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedImage); //Creates object and add image

      const response = await axios.post(
        // Send post request with image

        "https://m3-as-dz.azurewebsites.net/api/upload",
        formData
      );

      console.log("API Response:", response.data);

      const aiPredictions = response.data.response.predictions;
      const targetTags = aiPredictions.map((prediction) =>
        prediction.tagName.toLowerCase()
      );

      let similarCars = []; // Empty array to hold list of cars
      // Find the first similar car based on the top prediction
      for (let i = 0; i < Math.min(3, targetTags.length); i++) {
        const filteredCars = carsData.carsList.filter(
          (car) => car.model.toLowerCase() === targetTags[i]
        ); //Filter json

        if (filteredCars.length > 0 && similarCars.length < 3) {
          for (const car of filteredCars) {
            similarCars.push(car);
          }
        }
      }

      console.log("Found Similar Car:", similarCars);

      // Updates state with the similars car
      setSimilarCar(similarCars);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload</button>

      {similarCar && (
        <div>
          <h2>Similar Cars</h2>
          {similarCar.map((car, index) => (
            <div key={index}>
              <h3>
                {car.brand} {car.model}
              </h3>
              <p>
                <b>Year:</b> {car.year}
              </p>
              <p>
                <b>Color:</b> {car.color}
              </p>
              <p>
                <b>Type:</b> {car.type}
              </p>
              <img src={car.imageURL} alt={`${car.brand} ${car.model}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
