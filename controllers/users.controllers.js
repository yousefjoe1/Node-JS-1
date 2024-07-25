var express = require('express')
var bodyParser = require('body-parser')
var bcrypt = require('bcryptjs');

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Users = require('../models/user.model')

const addUser  = async (req,res)=> {

    const oldUser = await Users.findOne({email:req.body.email})

    if(oldUser){
        res.status(400).send({status:'error',data: null,code: 400,msg:'Email exist .. choose another one.'})
    }else {
        const {username,email,password} = req.body;

        // password hashing
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new Users({
            username: username,
            email: email,
            password: hashedPassword,
        })
        try {
            await newUser.save();
            res.json({status:'success',data: newUser,code: 201,msg:'User Created'})
          } catch (error) {
            console.error(error);
            res.json({status:'error',data: null,code: 400,msg:'Error in registeration'})
          }
    }


}

const getUsers  = async (req,res)=> {
    const users = await Users.find({},{'__v':false,'password': false})
    res.json({status:'success',data: users})
}

const loginUser = async(req,res)=> {
    const {email,password} = req.body;
    if(!email && !password){
        res.status(400).send({status:'error',data: null,code: 400,msg:'Fill the form first'})
    }

    const user = await Users.findOne({email:email})
    if(!user){
        return res.status(400).send({status:'error',data: null,code: 400,msg:'Wrong details'})
    }

    const matchedPassword = await bcrypt.compare(password,user.password)

    if(user && matchedPassword){
        return res.status(200).send({status:'success',data: null,code: 200,msg:'Loged in'})
    }else{
        return res.status(400).send({status:'error',data: null,code: 400,msg:'wrong password or email'})

    }
}

const getUser = async (req,res)=> {
    const user = await Users.findById(req.params.userId)
    res.json({status:'success',data: product})
}




module.exports = {
    getUsers,
    getUser,
    addUser,loginUser
}