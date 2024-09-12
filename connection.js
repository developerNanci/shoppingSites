const mongoose = require("mongoose");

async function connectMongodb(url){
    return mongoose.connect(url)
    // .then(() => console.log("mongoDb connected"))
    // .catch((err) => console.log(err));
  
}

module.exports = {
    connectMongodb
}