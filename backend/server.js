const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const multer = require("multer");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(upload.single("image"));
app.use("/api", apiRoutes);

module.exports = app;
