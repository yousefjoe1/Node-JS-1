const { addProductToCart, getCart,deleteUserCart } = require('../controllers/cart.controller')

const exp = require('express')

const router = exp.Router()


router.post('/add-to-cart',addProductToCart)
router.get('/',getCart)
router.delete('/:cartId',deleteUserCart)

module.exports = router
