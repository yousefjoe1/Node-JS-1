const { verifyAdmin, adminLogin } = require('../controllers/admin.controllers')

const exp = require('express')

const router = exp.Router()


router.post('/login',adminLogin)
router.get('/verify',verifyAdmin)

module.exports = router
