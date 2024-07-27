var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const Users = require("../models/user.model");

const addUser = async (req, res) => {
  const oldUser = await Users.findOne({ email: req.body.email });

  if (oldUser) {
    res
      .status(400)
      .send({
        status: "error",
        data: null,
        code: 400,
        msg: "Email exist .. choose another one.",
      });
  } else {
    const { username, email, password } = req.body;

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { password: password, email: email },
      process.env.S_key
    );
    try {
      await newUser.save();
      res.json({
        status: "success",
        data: newUser,
        code: 201,
        msg: "User Created",
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.json({
        status: "error",
        data: null,
        code: 400,
        msg: "Error in registeration",
      });
    }
  }
};

const getUsers = async (req, res) => {
  const users = await Users.find({}, { __v: false, password: false });
  res.json({ status: "success", data: users });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email: email });

  if (!user) {
    return res
      .status(400)
      .send({ status: "error", data: null, code: 400, msg: "Wrong details" });
  }

  if (!email && !password) {
    res
      .status(400)
      .send({
        status: "error",
        data: null,
        code: 400,
        msg: "Fill the form first",
      });
  }

  if (!user) {
    return res
      .status(400)
      .send({ status: "error", data: null, code: 400, msg: "Wrong details" });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = jwt.sign(
      { password: password, email: email },
      process.env.S_key
    );
    return res
      .status(200)
      .send({
        status: "success",
        data: null,
        code: 200,
        msg: "Loged in",
        token: token,
      });
  } else {
    return res
      .status(400)
      .send({
        status: "error",
        data: null,
        code: 400,
        msg: "wrong password or email",
      });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.json({data:{ status: "error", data: null, code: 400, msg: "Wrong details" }})
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  const token = jwt.sign({ password: password, email: email },process.env.S_key);
  let key = process.env.ADMIN_KEY;

  if (user && matchedPassword) {
    if (user.email == key) {
      return res
        .status(200)
        .send({status: "success", data: null, code: 200, msg: "Loged in admin",token: token});
    }
  }
};

const verifyAdmin = async (req, res) => {
  const auth = req.headers['Authorization'] || req.headers['authorization']  
  const token = auth.split(' ')[1];

  if (!token) {
    return res.json({data:{ status: "error", data: null, code: 400, msg: "Token required" }})
  }

  const isAdmin = jwt.verify(token,process.env.S_key)
      return res.status(200)
        .send({status: "success", data: null, code: 200, msg: "Loged in admin",token: token});

};

const getUser = async (req, res) => {
  const user = await Users.findById(req.params.userId);
  res.json({ status: "success", data: product });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  loginUser,
  adminLogin,
  verifyAdmin
};
