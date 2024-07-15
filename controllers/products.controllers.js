
const Products = require('../models/product.model') 

const getProducts  = async (req,res)=> {
    const products = await Products.find()
    res.send(products)
}

module.exports = {
    getProducts
}