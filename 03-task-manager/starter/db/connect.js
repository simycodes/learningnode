const mongoose = require('mongoose');

const connectionString = '';


const connectDB = (url) => {
    //mongoose.connect() returns a promise and its result is checked if its a success
    return mongoose.connect(url, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:true,
        useUnifiedTopology:true,
        //the use statements remove the deprecated warnings in the console
    })
}

module.exports = connectDB

//.then(() => console.log('Connected to the DB...')).catch((err) => console.log(err));