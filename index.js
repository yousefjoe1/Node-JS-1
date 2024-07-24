var express = require('express')
var bodyParser = require('body-parser')

require('dotenv').config()

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const url = process.env.USER_ID;

const mongoose = require('mongoose')

mongoose.connect(url).then(res=> {
    console.log('mongoose done');
})

const productsRouter = require('./routes/products.route')
const userRouter = require('./routes/users.route')

app.use('/api/products',productsRouter)
app.use('/api/users',userRouter)


app.listen(4000,()=>{
    console.log('server running');
})