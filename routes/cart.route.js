const { addProductToCart, getCart } = require('../controllers/cart.controller')

const exp = require('express')

const router = exp.Router()


router.post('/cart',addProductToCart)
router.get('/',getCart)

module.exports = router
