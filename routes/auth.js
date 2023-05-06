const express = require('express')

const router = express.Router()

// middlewares - check the token
const { authCheck } = require('../middlewares/auth')

// import controller which we use below as an argument in router.post
const { createOrUpdateUser } = require('../controllers/auth')

router.post('/create-or-update-user', authCheck, createOrUpdateUser)

module.exports = router


