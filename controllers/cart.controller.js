var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const Cart = require("../models/cart.model");
const Users = require("../models/user.model");

const addProductToCart = async (req, res) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];

  if (!auth) {
    return res.json({
      data: { status: "error", data: null, code: 400, msg: "Login First" },
    });
  }
  const token = auth.split(" ")[1];

  const isUser = jwt.verify(token,process.env.S_key);

  const email = await Users.findOne({email:isUser.email})

  if (!token) {
    return res.json({
      data: { status: "error", data: null, code: 400, msg: "Login First" },
    });
  }

  // res.status(200).send({status: "success", data: null, code: 200, msg: "Loged in admin",token: token});
  const cart = await Cart.find() 
  const filterdCart = cart.filter(p=> p.product._id == req.body.product._id)
  if(filterdCart.length != 0) {
    return res.status(201).send({product:true}); // Created (201) status code
  }
  const newProduct = new Cart({
    user_id: email._id,
    product: req.body.product,
    count: req.body.count,
  });
  try {
    await newProduct.save();
    res.status(201).send(newProduct); // Created (201) status code
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving product");
  }
};

const getCart = async (req, res) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  const token = auth.split(" ")[1];

try {
  
  const isUser = jwt.verify(token,process.env.S_key);
  
  const email = await Users.findOne({email:isUser.email})

  if(email.email == isUser.email){
    const cart = await Cart.find({user_id:email._id});
    res.json({ status: "success", data: cart });
  }else {
    res.json({ status: "error", data: [] });
  }
} catch (er) {
  res.json({ status: "error", data: [] });
  
}

};

const updateCart = async (req, res) => {
  const productId = req.params.productId;

  const newProductObj = { $set: { ...req.body } };

  const newProduct = await Cart.updateOne({ _id: productId }, newProductObj);

  try {
    res.status(201).send(newProduct); // Created (201) status code
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving product");
  }
};

const deleteCart = async (req, res) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];

  if (!auth) {
    return res.json({
      data: { status: "error", data: null, code: 400, msg: "Login First" },
    });
  }
  const token = auth.split(" ")[1];
  
  if (!token) {
    return res.json({
      data: { status: "error", data: null, code: 400, msg: "Login First" },
    });
  }

  try {

    const isUser = jwt.verify(token,process.env.S_key);
    const email = await Users.findOne({email:isUser.email})


    if(email.email == isUser.email){

      await Cart.deleteOne({ _id: req.params.cartId });
      res.json({ status: "success", data: null,msg: 'Product deleted' });

    }else{
      res.json({ status: "error", data: null,msg: 'You need to login' });
    }
    
  } catch (er) {
    res.json({ status: "error", data: null,msg: 'error deleting cart item' });
  }

};

module.exports = {
  addProductToCart,
  getCart,
  updateCart,
  deleteCart,
};
