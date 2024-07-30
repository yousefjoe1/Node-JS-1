const { verifyAdmin, adminLogin } = require('../controllers/admin.controllers')

const exp = require('express')

const router = exp.Router()


router.post('/login',adminLogin)
router.get('/verify-admin',verifyAdmin)

module.exports = router
