const express = require('express')
const app = express()

//  req => middleware => res
const logger = require('./middlewareFunctions');
const authorize = require('./authorize');

//This method will make all the routes have the logger and authorize functions automatically
//logger will get executed first..in this order
app.use([logger,authorize]); 
//app.use(logger); 
//app.use('/about', logger); //This will make the only the about route to have the logger 
//function and all routes emerging from the about page.

//1.use vs route,do use when adding middleware functions in all routes,put in a specific 
//route when that middleware function just needs to be used in a specific route
//2.options - our own/express/third party
//we can create our own middleware functions,use express middleware(already written,just refe
//rence) and we can also use third party downloaded middleware
//example of express middleware function is static() as shown below
//app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send('Home')
})

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/api/products', (req, res) => {
  res.send('Products')
})

app.get('/api/items', (req, res) => {
  console.log(req.user)
  res.send('Items')
})

//passing two middleware functions
// app.get('/api/items', [logger,authorize],(req, res) => {
//   console.log(req.user)
//   res.send('Items')
// })


app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
