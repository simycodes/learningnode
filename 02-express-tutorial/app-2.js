const http = require('http');
const { readFileSync } = require('fs');

// get a complete home page file and use it in the server,using the res.write() method
const homePage = readFileSync('./index.html')


const server = http.createServer((req,res)=>{
    //The request object
    //console.log(req.method); //Each user request comes in a method eg GET
    //console.log(req.url); //The url shows which page the user wants to access on the website
    const url = req.url;

    if(url === '/'){
        //The response object
        //Home Page
        res.writeHead(200, {'content-type': 'text/html'}); //indicates success request and page meta data
        res.write(homePage); //write the page html here
        res.end()//every response must have the end property,notifies communication is over
    }
    else if (url === '/about'){
        //Contact Page
        res.writeHead(200, {'content-type': 'text/html'}); 
        res.write('<h1>About Page</h1>'); 
        res.end()
    }
    else {
        //404 page not found
        res.writeHead(404, {'content-type': 'text/html'}); 
        res.write('<h1>Page not Found</h1>'); 
        res.end()
    }
    

    console.log('User hit the server');
});


server.listen(5000);
