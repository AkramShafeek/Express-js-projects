const express = require('express');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');
const connectToMongo = require('./database/connectToMongo');
const productsRouter = require('./routes/products');
require('dotenv').config();

// async errors

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  return res.send('<h1>Store API</h1>');
})
app.use('/api/v1/products', productsRouter);

// products routes

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