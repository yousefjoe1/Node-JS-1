var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const Cart = require("../models/cart.model");

const addProductToCart = async (req, res) => {
  console.log(req.body);
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

  //   const isUser = jwt.verify(token,process.env.S_key);
  //   console.log(isUser,'user details');
  // res.status(200).send({status: "success", data: null, code: 200, msg: "Loged in admin",token: token});
  const newProduct = new Cart({
    user_id: req.body.user_id,
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
  const cart = await Cart.find();
  res.json({ status: "success", data: cart });
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
  await Cart.deleteOne({ _id: req.params.productId });
  res.json({ status: "success", data: null });
};

module.exports = {
  addProductToCart,
  getCart,
  updateCart,
  deleteCart,
};
