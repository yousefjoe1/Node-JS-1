const { addProductToCart, getCart, deleteCart } = require('../controllers/cart.controller')

const exp = require('express')

const router = exp.Router()


router.post('/add-to-cart',addProductToCart)
router.get('/',getCart)
router.delete('/:cartId',deleteCart)

module.exports = router
