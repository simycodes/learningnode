//--turning(parsing) incoming request
// url which is a string into an object that can be easily used using the url module

var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  /*Use the url module to turn the querystring/request url into an object:*/
  var q = url.parse(req.url, true).query;
  /*Return the year and month from the query object:*/
  var txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);

// The address:
// http://localhost:8080/?year=2017&month=July

// Will produce this result:
// 2017 July


// Split the Query String

// There are built-in modules to easily split the query string into 
// readable parts, such as the URL module. --turning(parsing) incoming request
// url which is a string into an object that can be easily used 
