const express = require('express'); //importing an express class into the program
const app = express(); //making an instance/object of the express,that will be used in the program

//Mostly used methods from express.By default all browsers perform a get request
// app.get -- reads data -- represents what user wants to do,in this case get and read the data
// app.post -- inserts data -- represents what user wants to do,in this case insert data
// app.put -- updates data -- represents what user wants to do,in this case update the data
// app.delete -- deletes data -- represents what user wants to do,in this case delete the data
// app.all -- handles all user http requests, works in coordination with the top 4 methods
// app.use -- used in middleware
// app.listen -- in charge making available the listening port

//Home Page
app.get('/',(req,res)=> {
    //res.status(200);   //express sends status codes,but send them also, to have control as dev
    //res.send('Home Page');
    res.status(200).send('Home Page');
    console.log('User has hit the server');
})

//About Page
app.get('/about',(req,res)=> {
    res.status(200).send('About page');
})

//All requests hitting 404 errors
app.all('*',(req,res)=>{
    res.status(404).send('<h1>Resource Not Found</h1>');
})

app.listen(5000,()=> {
    console.log('Server is listening on port 5000...');
})