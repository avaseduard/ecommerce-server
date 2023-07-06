const express = require('express')
const router = express.Router()

// Middlewares - check the token and check for admin role
const { authCheck } = require('../middlewares/auth')

// Import controllers which we use below as arguments in router actions
const { userCart, getUserCart } = require('../controllers/user')

// Routes (endpoints)
router.post('/user/cart', authCheck, userCart)
router.get('/user/cart', authCheck, getUserCart)

module.exports = router
