const express = require('express');
const expressServer = express();

const { products } = require('./data')

expressServer.get('/',(req,res)=>{
    res.json(products);
})

expressServer.listen(5000,()=>{
    console.log('Server is Listening on port 5000...')
})
