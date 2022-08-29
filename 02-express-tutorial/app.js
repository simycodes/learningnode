const express = require('express')
const app = express()

//importing the people and auth routes so they can be used directly in the server app
const people = require('./routes/people')
const auth = require('./routes/auth')

// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))

// parse json (any other data passed from web page not coming from the forms)
app.use(express.json()) //puts data in the req.body property

//setting up the people base route and the login route, This is the base route /api/people
app.use('/api/people', people)//people contains all possible routes that start with /api/people
app.use('/login', auth) 
//auth is a router object variable,contains the routes that start with /login

//app.use('/api/people', people) - means lets have an object that handles all routes that
//start with /api/people called people,people contains code from a router file called people.js,
//that handles all requests starting with /api/people.This file is put inside the router folder.

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
