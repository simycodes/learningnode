const express = require('express');
const app = express();

const morgan = require('morgan');

// app.use(express.static('./public'))

app.use(morgan('tiny'));  //tiny provides most essential methods/data of morgan
//refresh the window browser and check vs console for changes that show how morgan is working

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

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
