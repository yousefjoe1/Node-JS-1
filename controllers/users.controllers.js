var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Users = require('../models/user.model')

const addUser  = async (req,res)=> {
    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        await newUser.save();
        res.status(201).send(newUser); // Created (201) status code
      } catch (error) {
        console.error(error);
        res.status(500).send('Error saving newUser');
      }
}

const getUsers  = async (req,res)=> {
    const users = await Users.find()
    res.json({status:'success',data: users})
}


const getUser = async (req,res)=> {
    const user = await Users.findById(req.params.userId)
    res.json({status:'success',data: product})
}




module.exports = {
    getUsers,
    getUser,
    addUser
}