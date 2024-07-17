const exp = require('express')

const {MongoClient} = require('mongodb')

const client = new MongoClient(url)

const connectDb = async () => {
    await client.connect()
    console.log('connected to mongo db');

    const db = client.db('products-db')
    // console.log(db);

    const collection = db.collection('products')

    const products = await collection.find().toArray()
    console.log(products,'products');

}

connectDb().then(res=>{
    console.log(res);
}).catch(er=> {
    console.log(er,'error');
})


const app = exp()

const productsRouter = require('./routes/products.route')

app.use('/api/products',productsRouter)




app.listen(4000,()=>{
    console.log('server running');
})