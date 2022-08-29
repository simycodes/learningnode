const express = require('express');
const app = express();

const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

const notFound = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler")

//middleware
app.use(express.static('./public'));
app.use(express.json())

//routes
app.get('/hello',(req, res) => {
    res.send('Task Manager App');
})

//base route
app.use('/api/v1/tasks', tasks);
//middleware to handle 404 errors
app.use(notFound);
//handling error from try and catch
app.use(errorHandlerMiddleWare);

//if the port is not set by the service provider in the process.env(deployment point) use 5000
const port = process.env.PORT || 5000;
//example using process.env.PORT --type below code in the console
//PORT=6000 node app.js

//only start the server if connection to the database is successful
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start();



