const express = require('express')

const router = express.Router()

// middlewares - check the token
const { authCheck, adminCheck } = require('../middlewares/auth')

// import controller which we use below as an argument in router.post
const { createOrUpdateUser, currentUser } = require('../controllers/auth')

router.post('/create-or-update-user', authCheck, createOrUpdateUser)
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', authCheck, adminCheck, currentUser)

module.exports = router
