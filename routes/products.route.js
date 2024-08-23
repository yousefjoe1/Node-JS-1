
const  {getProducts, addProduct, getProduct, updateProduct, deleteProduct}  = require('../controllers/products.controllers')

const exp = require('express')


const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'imgs/uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
  })
  
  const upload = multer({ storage: storage })

const router = exp.Router()

router.get('/',getProducts)

router.post('/',upload.single('image'),addProduct)

router.get('/:productId',getProduct)

router.patch('/:productId',upload.single('image'),updateProduct)

router.delete('/:productId',deleteProduct)


module.exports = router