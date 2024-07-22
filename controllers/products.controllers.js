var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Products = require('../models/product.model')

const addProduct  = async (req,res)=> {
    const newProduct = new Products({
        name: req.body.name,
        price: req.body.price,
        details: req.body.details,
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

const getProducts  = async (req,res)=> {
    const products = await Products.find()
    res.json({status:'success',data: products})
}


const getProduct  = async (req,res)=> {
    const product = await Products.findById(req.params.productId)
    res.json({status:'success',data: product})
}


const updateProduct  = async (req,res)=> {
    const productId = req.params.productId

    const newProductObj = {$set:{...req.body}}

    const newProduct = await Products.updateOne({_id:productId},newProductObj)

    try {
        res.status(201).send(newProduct); // Created (201) status code
      } catch (error) {
        console.error(error);
        res.status(500).send('Error saving product');
      }
}


const deleteProduct  = async (req,res)=> {
  await Products.deleteOne({_id: req.params.productId})
  res.json({status:'success',data: null})
}


module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}