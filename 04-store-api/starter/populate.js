//send data from the products.json file directly to the database
require('dotenv').config();

const connectDB = require('./db/connect');
const productSchema =  require('./models/product');
const jsonProducts = require('./products.json');

const start = async() => {
   try {
    await connectDB(process.env.MONGO_URI);
    await productSchema.deleteMany(); //delete all the current data in the database
    await productSchema.create(jsonProducts) //passing an array of objects to the database
    console.log('Success! Data sent to the db successfully');

    process.exit(0); 
    //this stops a process from running after its successfully executed hence use of 0
   } catch (error) {
    console.log(error);
    process.exit(1); 
   }
}


start();
//node populate  - code to run this automatic data addition to the database