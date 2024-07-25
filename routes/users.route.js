const  {getUsers, addUser, loginUser}  = require('../controllers/users.controllers')
const exp = require('express')

const router = exp.Router()

router.get('/',getUsers)

router.post('/register',addUser)
router.post('/login',loginUser)

module.exports = router
