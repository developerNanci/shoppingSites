const mongoose = require("mongoose");

const connectMongodb = async (url) => {await mongoose.connect(url)};

module.exports = {
  connectMongodb,
};
