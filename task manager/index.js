const express = require('express');
const connectToMongo = require('./database/connectToMongo');
const app = express();
const tasks = require('./routes/tasks');
require('dotenv').config();

// middleware
app.use(express.json());


// routes
app.use('/api/v1/tasks',tasks);

// app.get('/api/v1/tasks')
// app.post('/api/v1/tasks')
// app.get('/api/v1/tasks/:id')
// app.patch('/api/v1/tasks/:id')
// app.delete('/api/v1/tasks/:id')


const port = 5000;

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