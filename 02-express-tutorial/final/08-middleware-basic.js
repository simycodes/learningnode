const express = require('express')
const app = express()

//Middleware are methods/functions that are executed when requests are send to the server. 
//Each method has access to the req and res objects
//  req => middleware => res

const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next();
  //next help pass the program running from logger middleware to the other methods get method
  //always put next() at end of every middleware method unless u ending the middleware with
  //message being sent to the website such as res.send('About')
}

app.get('/', logger, (req, res) => { 
  //express passes req,res and next arguments automatically when the middleware method(logger)
  //is called
  //The below commented code works same as one in the called function logger
  // const method = req.method
  // const url = req.url
  // const time = new Date().getFullYear()
  // console.log(method, url, time)
  res.send('Home')
})

app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
