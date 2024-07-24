const  {getUsers, addUser}  = require('../controllers/users.controllers')
const exp = require('express')

const router = exp.Router()

router.get('/',getUsers)

router.post('/register',addUser)

module.exports = router
