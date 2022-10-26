const mongoose = require("mongoose");
const User = require("../models/user");
const express = require(`express`);
const jwt = require("jsonwebtoken");
const e = require("express");
const router = express.Router();
function verifyToken(request, response, next) {
  if (!request.headers.authorization) {
    return response.stauts(401), send("Unauthorized request");
  }
  let token = request.headers.authorization.split("")[1];
  if (token == "null") {
    return response.status(401), send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return response.status(401).send("Unauthorized request");
  }
  request.userId = payload.subject;
  next();
}
router.get("/", async (request, response) => {
  await response.send("<h1>Hello form the api page</h1>");
});
router.post("/register", async (request, response) => {
  try {
    userData = request.body;
    const { name, password } = request.body;
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return response
        .status(400)
        .json({ msg: "User already exists with the same username" });
    }
    user = new User(userData);
    user.save((error, registeredUser) => {
      if (error) {
        console.log(error);
      } else {
        let payload = { subject: registeredUser._id };
        let token = jwt.sign(payload, "secretKey");
        response.status(200).send({ token });
      }
    });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});
router.post("/login", async (request, response) => {
  try {
    let userData = request.body;
    User.findOne({ name: userData.name }, (error, user) => {
      if (error) {
        console.log(error);
      } else {
        if (!user) {
          response.status(401).send("Invalid username");
        } else {
          if (user.password !== userData.password) {
            response.status(401).send("Invalid password");
          } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, "secretkey");
            response.status(200).send({ token });
          }
        }
      }
    });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});
module.exports = router;
