var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const url = 'mongodb+srv://youssef-dev:cloud.mongodb.pass@learn-mongodb.xjqerea.mongodb.net/products-db?retryWrites=true&w=majority&appName=learn-mongodb'

const mongoose = require('mongoose')

mongoose.connect(url).then(res=> {
    console.log('mongoose done');
})


const productsRouter = require('./routes/products.route')

app.use('/api/products',productsRouter)

app.listen(4000,()=>{
    console.log('server running');
})