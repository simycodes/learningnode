var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

//The code tells the computer to write "Hello World!" if anyone (e.g. a web browser) tries to access
// your computer on port 8080.

// Initiate "myfirst.js":

// node myfirst.js
// Now, your computer works as a server!

// If anyone tries to access your computer on port 8080, they will get a "Hello World!"
// message in return!

// Start your internet browser, and type in the address: http://localhost:8080