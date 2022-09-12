const express = require('express');
const router = express.Router();

const { getAllProductsStatic, getAllProducts } = require('../controllers/products')

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
//router can be changed to any other name such as productsRouter as this is a property of the
//express.Router() and needs to be exports as it is defined when being initialised from the
//express.Router()