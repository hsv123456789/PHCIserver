const port = 3000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");

const url =
  "mongodb+srv://hsv123456789:vaishnavee@cluster0.yzu2ier.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const api = require("./routes/api");
const { userModel } = require("./models/user");
app.use(bodyParser.json());
app.use("/api", api);

app.get("/", async (request, response) => {
  const user = await userModel.create({
    name: "admin",
    password: "admin",
  });
  response.json(user);
});
mongoose.connect(url, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("The connection to mongo db is successfull");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`The application is starting at the port ${port}`);
});
