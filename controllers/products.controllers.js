var express = require('express')
var bodyParser = require('body-parser')
var jwt = require("jsonwebtoken");
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
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
          return res.json({ status: "error", data: null,code: 400, msg: "The image has the wrong type ... choose image like: png or jpg or jpeg .",});
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
    return res.json({data: {msg: 'You need to be an admin',code:301}});
  }

  let newProduct = ''
    if(productImg.length == 0){
       newProduct = new Products({
          name: req.body.name,
          price: req.body.price,
          details: req.body.details,
          in_cart: false,
          in_favorit: false,
      })
    }else {
      newProduct = new Products({
          name: req.body.name,
          price: req.body.price,
          details: req.body.details,
          in_cart: false,
          in_favorit: false,
          image: productImg
      })

    }

    try {
        await newProduct.save();
        res.json({msg: 'Success - product created',code: 201}); // Created (201) status code
      } catch (error) {
        console.log(error,'error');
        res.json({msg: `Error saving -- ${error._message}`,code: 301});
      }
}


const deleteProduct  = async (req,res)=> {
  const auth = req.headers['Authorization'] || req.headers['authorization']  
  const token = auth.split(' ')[1];

  if (!token) {
    return res.json({status: "error", data: null, code: 400, msg: "Token required" })
  }

  const isAdmin = jwt.verify(token,process.env.S_key)
  if(isAdmin.email != process.env.ADMIN_KEY){
    return res.json({msg: 'You need to be an admin',code:301});
  }
  
  try {
    await Products.deleteOne({_id: req.params.productId})
    
    res.json({status:'success',data: null,code: 201,msg: 'Product Deleted .. '})
  } catch (er) {
    console.log(er,'delete errors');
    res.json({status:'error',data: null,code: 403,msg: 'Product Deleted .. '})
    
  }
}


const updateProduct  = async (req,res)=> {
  
  const productId = req.params.productId
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
    return res.json({status: "error", data: null, code: 400, msg: "Token required" })
  }

  const isAdmin = jwt.verify(token,process.env.S_key)
  if(isAdmin.email != process.env.ADMIN_KEY){
    return res.json({msg: 'You need to be an admin',code:301});
  }
  
  let newp = ''

  if(productImg == ''){
    newp = {$set:{...req.body}}

  }else {
    newp = {$set:{...req.body,image:productImg}}
  }

  await Products.updateOne({_id:productId},newp)

  try {
      res.json({status:'success',msg: 'Updated',code: 201});
    } catch (error) {
      console.error(error);
      res.json({status:'error',msg: 'Error Updating the product',code: 403})
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






module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}