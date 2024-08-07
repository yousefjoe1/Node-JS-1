var express = require('express')
var bodyParser = require('body-parser')
var jwt = require("jsonwebtoken");

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Products = require('../models/product.model')

const addProduct  = async (req,res)=> {

  let productImg= ''
  if(req.file != undefined){
      const {filename,mimetype} = req.file;
      if(filename != undefined){
        productImg= filename
        const fileType = mimetype.split('/')[1]
        const types = ['jpg','jpeg','png']
        if(!types.includes(fileType)){
          return res.status(400).send({ status: "error", data: null,code: 400, msg: "The image has the wrong type ... choose image like: png or jpg or jpeg .",});
        }
      }

  }
  
  const auth = req.headers['Authorization'] || req.headers['authorization']  
  const token = auth.split(' ')[1];

  if (!token) {
    return res.json({data:{ status: "error", data: null, code: 400, msg: "Token required" }})
  }

  const isAdmin = jwt.verify(token,process.env.S_key)
  if(isAdmin.email != process.env.ADMIN_KEY){
    return res.status(500).send('You need to be an admin');
  }
  // res.status(200).send({status: "success", data: null, code: 200, msg: "Loged in admin",token: token});
    const newProduct = new Products({
        name: req.body.name,
        price: req.body.price,
        details: req.body.details,
        in_cart: false,
        in_favorit: false,
        image: productImg
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
  
  try {
    let resp = await Products.deleteOne({_id: req.params.productId})
    
    res.json({status:'success',data: null,code: 201})
  } catch (er) {
    console.log(er,'delete errors');
    res.json({status:'error',data: null,code: 403})
    
  }
}


module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}