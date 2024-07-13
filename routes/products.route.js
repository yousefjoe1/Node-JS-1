
const  {getProducts}  = require('../controllers/products.controllers')

const exp = require('express')

const router = exp.Router()


const products = [
    {
        id:1,
        name:'apple phone',
        price: 300,
        in_cart: false
    },
    {
        id:2,
        name:'apple phone 2',
        price: 300,
        in_cart: false
    },
    {
        id:3,
        name:'apple phone 3',
        price: 300,
        in_cart: false
    },
]

router.get('/',getProducts)

router.get('/:productId',(req,res)=> {
    const productId = req.params.productId
    const product = products.find(pr=> pr.id == productId)
    if(!product){
        res.send({msg: 'No product found'})
    }
    res.send(product)
})

module.exports = router