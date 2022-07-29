const http = require('http')

//the createServer uses return function which takes in two arguments which are objects representing
//the user request (req) and the server response(res).Each of these has its own methods/properties
const server = http.createServer((req, res) => {
  //   if (req.url === '/') {
  //     res.end('Welcome to our home page')
  //   }
  //   if (req.url === '/about') {
  //     res.end('Here is our short history')
  //   }
  //   res.end(`
  //   <h1>Oops!</h1>
  // <p>We can't seem to find the page you are looking for</p>
  // <a href="/">back home</a>
  //   `)
  // ###################################
  // ###################################
  //
  //  IF YOU GET ERRORS WHILE USING ABOVE SETUP,
  // SWITCH TO IF, ELSE IF, ELSE (BELOW)
  // WE COVER THE CAUSE, LATER IN EXPRESS TUTORIAL

  //The response to be given to the user is depending on what the user request/asks for and this
  //detected in the users request object
  if (req.url === '/') {
    res.end('Welcome to our home page');
  } 
  else if (req.url === '/about') {
    res.end('Here is our short history');
  }
  else {
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `)
  }
})

server.listen(5000)
