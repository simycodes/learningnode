const express = require('express');
const app = express();

//Connecting to the db
connectDB =  require('./db/connect');

//Importing routes
const productsRouter = require('./routes/products');

//importing the .env file to access private data
require('dotenv').config();
//importing package to handle the many async and try catch errors handled in controllers
require('express-async-errors');

//importing middleware functions
const notFoundMiddleWare = require('./middleware/not-found');
const errorMiddleWare = require('./middleware/error-handler');

//Routes
//home route
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="api/v1/products">products route</a>');
});

//Base route - Use the use() method when linking a specific link with an imported Router (that
//contains multiple defined routers in the routers folder)
app.use('/api/v1/products/',productsRouter);

//use the use() method to make use of the middleware functions like those handling route errors
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 5000

//start function to start the server after connecting to the database
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();
//console.log('04 Store API')
