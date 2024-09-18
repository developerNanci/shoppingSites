const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
        unique: true,
      },
      gender: {
        type: String,
      },
      password : {
        type: String,
        require: true,
      }
    },
    { timestamps: true }
  );

  const newUser = mongoose.model("new-user", newUserSchema);

  module.exports = newUser