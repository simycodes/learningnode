const express = require('express');
const path = require('path'); //will be used to get the html file/others needed to be displayed

//creating an express server instance/object
const expressServer = express(); 

//Setup static and middleware
//importing/getting all the necessary files needed to run a website, all css, all images
//all logos and all js scripts.Common use,is to put all these static files in a folder called
//public.This will directly call the index page of a given website and will show on server port
expressServer.use(express.static('public'))
//static() is an express middleware function
//use() function mainly allows us to use express middleware functions

expressServer.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./navbar-app/index.html')) //this is an absolute path
    //.resolve can be replaced  by .join
    //__dirname returns the name of the current working directory
    //__dirname is an environment variable that tells you the absolute path of the 
    //directory containing the currently executing file.
})

expressServer.get('*',(req,res)=>{
    res.status(404).send('<h1>Resource/Page Not Found</h1>')
})

expressServer.listen('5000',()=> {
    console.log('Listening on port 5000...');
})