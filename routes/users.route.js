const  { addUser, loginUser, verifyUser}  = require('../controllers/users.controllers')
const exp = require('express')

const router = exp.Router()


router.post('/register',addUser)
router.post('/login',loginUser)
router.get('/verify-user',verifyUser)

module.exports = router
