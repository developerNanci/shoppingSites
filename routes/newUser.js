const express = require('express')
const router = express.Router()
const { handleUserSignup } = require('../controller/newUser')

router.get('/', handleUserSignup)

module.exports = router