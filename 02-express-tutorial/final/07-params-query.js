const express = require('express');
const expressServer = express();

const { products } = require('./data')

//This is the home page route
expressServer.get('/',(req,res)=>{
    res.send('<h1> Home Page</h1><a href="/api/products">products</a>') 
})

//This is a basic route
expressServer.get('/api/products', (req, res) => {
    //res.json(products) //This will send all data about each item in the API
    //Below code will remove the description property from each Item
    const newProducts = products.map((product) => {
      const { id, name, image } = product;
      return { id, name, image } //the destructured products are the ones that are returned
    })
  
    res.json(newProducts)
})

expressServer.get('/api/products/:productID', (req, res) => {
    //:productId is a route parameter,helps us get specific data from a user request/action
    // console.log(req)
    //console.log(req.params)
    const { productID } = req.params 
    //req.params gets each items id number,which is a string and needs to be parsed
  
    const singleProduct = products.find(
      (product) => product.id === Number(productID)
    )
    if (!singleProduct) { //if singleProduct is undefined,send an error message
      return res.status(404).send('Product Does Not Exist')
    }
  
    return res.json(singleProduct)
})

expressServer.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello world')
})
  
//This is a bit more complex route,defined on the server,that user can use on the website 
//to access data that is more specified,the specific query starts after the ?
//example of query made on website http://localhost:5000/api/v1/query?search=a&limit=1
expressServer.get('/api/v1/query', (req, res) => {
    //query parameter also known as url parameter
    //query part helps decide what user exactly wants to get from the server,sorted data etc
    //not actually part of the url,it just specifies the information needed
    // console.log(req.query)
    const { search, limit } = req.query
    let sortedProducts = [...products]
  
    if (search) {
      sortedProducts = sortedProducts.filter((product) => {
        return product.name.startsWith(search)
      })
    }

    if (limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    
    if (sortedProducts.length < 1) {
      // res.status(200).send('no products matched your search');
      return res.status(200).json({ sucess: true, data: [] })
    }
    res.status(200).json(sortedProducts)
})

expressServer.listen(5000,()=>{
    console.log('Server is Listening on port 5000...')
})
