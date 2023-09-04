const app = require("./server"); // Adjust the path to your server file

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
