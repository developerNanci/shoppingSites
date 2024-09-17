
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: String,
    redirectURL: String,
    visitHistory: [{
      timestamp: {type: Number}
    }]
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
