const  { loginUser,verifyUser, getUsers}  = require('../controllers/users.controllers')
const exp = require('express')

const router = exp.Router()


router.post('/login',loginUser)
router.get('/verify-user',verifyUser)
// router.get('/',getUsers)

module.exports = router
