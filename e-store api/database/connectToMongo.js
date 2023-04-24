const mongoose = require('mongoose');

function connectToMongo(mongoURI) {
    return mongoose.connect(mongoURI)
}

module.exports = connectToMongo;