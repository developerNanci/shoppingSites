const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      gender: {
        type: String,
      },
      password : {
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  );

  const newUser = mongoose.model("new-user", newUserSchema);

  module.exports = newUser