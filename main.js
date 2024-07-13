const exp = require('express')

const app = exp()

const productsRouter = require('./routes/products.route')

app.use('/api/products',productsRouter)

app.listen(4000,()=>{
    console.log('server running');
})