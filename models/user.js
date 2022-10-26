const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        return value.length > 0;
      },
      message: "Please enter a username",
    },
  },
  password: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        return value.length > 0;
      },
      message: "Please enter a password",
    },
  },
});

const userModel = mongoose.model("user", userSchema, "users");

module.exports = userModel;
