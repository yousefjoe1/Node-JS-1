var express = require('express')
var bodyParser = require('body-parser')


var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Products = require('../models/product.model')


const getProducts  = async (req,res)=> {
    const products = await Products.find()
    res.send(products)
}

const addProduct  = async (req,res)=> {

    const newProduct = new Products({
        name: req.body.name,
        price: req.body.price,
        in_cart: false,
        in_favorit: false,
        image: req.body.image
    })
    try {
        await newProduct.save();
        res.status(201).send(newProduct); // Created (201) status code
      } catch (error) {
        console.error(error);
        res.status(500).send('Error saving product');
      }
}

module.exports = {
    getProducts,
    addProduct
}