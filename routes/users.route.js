const  {getUsers, addUser, loginUser, adminLogin, verifyAdmin}  = require('../controllers/users.controllers')
const exp = require('express')

const router = exp.Router()

router.get('/',getUsers)

router.post('/register',addUser)
router.post('/login',loginUser)
router.post('/admin-login',adminLogin)
router.get('/verify',verifyAdmin)

module.exports = router
