
const express = require('express')
const router = express.Router()
const axios = require('axios')
const fs = require('fs')
const path = require('path')


router.get("/test", (req, res) => {
  res.send("Hello World!!");
});

router.get("/test2", (req, res) => {
  res.send("Dan is sick nasty with it.");
});


router.get('/test3', (req, res) => {
  const imagePath = path.join(__dirname, '../images/cat.jpg') // Update this path
  const imageStream = fs.createReadStream(imagePath)

  res.setHeader('Content-Type', 'image/jpeg')
  res.setHeader('Content-Disposition', 'inline; filename=image.jpg')

  imageStream.pipe(res)
})

router.post('/upload', async (req, res) => {
  try {
    const image = req.file.buffer; // Access the image buffer
    const apiUrl =
      "https://customcarvisionmrhq-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/0710a460-649f-495d-bb56-6a0aa84657a8/classify/iterations/Iteration6/image";
    const predictionKey = "8cc122f8a0284cc8b8dbc330cd63e03e";

    const response = await axios.post(apiUrl, image, {
      //Await indicates that this line will wait for the axios request to complete before continuing.
      headers: {
        "Content-Type": "application/octet-stream",
        "Prediction-Key": predictionKey,
      },
    });

    res.json({ response: response.data });
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = router;
