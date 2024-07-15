const exp = require('express')

// const {MongoClient} = require('mongodb')

const url = 'mongodb+srv://youssef-dev:cloud.mongodb.pass@learn-mongodb.xjqerea.mongodb.net/products-db?retryWrites=true&w=majority&appName=learn-mongodb'
// const client = new MongoClient(url)


// const connectDb = async () => {
//     await client.connect()
//     console.log('connected to mongo db');

//     const db = client.db('products-db')
//     // console.log(db);

//     const collection = db.collection('products')

//     const products = await collection.find().toArray()
//     console.log(products,'products');

// }

const mongoose = require('mongoose')

mongoose.connect(url).then(res=> {
    console.log(res,'mongoose done');
})

// connectDb().then(res=>{
//     console.log(res);
// }).catch(er=> {
//     console.log(er,'error');
// })




const app = exp()

const productsRouter = require('./routes/products.route')

app.use('/api/products',productsRouter)




app.listen(4000,()=>{
    console.log('server running');
})