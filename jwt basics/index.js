require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// database
const connectToMongo = require('./database/connectToMongo');

// error handlers
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');

// routers


// middleware
app.use(express.json());

// routes


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectToMongo(process.env.MONGO_URI);
    console.log("connected to database successfully");
    app.listen(port,console.log(`server is listening on port ${port}`));
} catch (error) {
    console.log("couldn't connect to database");
    console.log("Adhanala server start panna mudiyathu");
}
}

start();