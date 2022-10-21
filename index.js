const port = 3000;
const express = require("express");
const app = express();
const url =
  "mongodb+srv://hsv123456789:vaishnavee@cluster0.yzu2ier.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const { userModel } = require("./models/user");

app.get("/", async (request, response) => {
  const user = await userModel.create({
    name: "admin",
    password: "admin",
  });
  response.json(user);
});
mongoose.connect(url, (error) => {
  console.log("The connection is ", error);
});

app.listen(port, () => {
  console.log(`The application is starting at the port ${port}`);
});
