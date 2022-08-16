const http = require('http');
const { readFileSync } = require('fs');

// get all files
const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeImage = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')


const server = http.createServer((req,res)=>{
    //The request object
    //console.log(req.method); //Each user request comes in a method eg GET
    //console.log(req.url); //The url shows which page the user wants to access on the website
    const url = req.url;

    //Home Page
    if(url === '/'){
        //The response object
        res.writeHead(200, {'content-type': 'text/html'}); //indicates success request and page meta data
        res.write(homePage); //write the page html here
        res.end()//every response must have the end property,notifies communication is over
    }

    // styles
    else if (url === '/styles.css'){
        res.writeHead(200, {'content-type': 'text/css'}); 
        res.write(homeStyles); 
        res.end()
    }

    // image/logo
    else if (url === '/logo.svg'){
        res.writeHead(200, {'content-type': 'image/svg+xml'}); 
        res.write(homeImage); 
        res.end()
    }

     // logic
     else if (url === '/browser-app.js'){
        res.writeHead(200, {'content-type': 'text/javascript'}); 
        res.write(homeLogic); 
        res.end()
    }

    //404 page not found
    else {
        res.writeHead(404, {'content-type': 'text/html'}); 
        res.write('<h1>Page not Found</h1>'); 
        res.end()
    }
    

    console.log('User hit the server');
});


server.listen(5000);
