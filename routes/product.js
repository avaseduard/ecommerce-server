const express = require('express')
const router = express.Router()

// Middlewares - check the token and check for admin role
const { authCheck, adminCheck } = require('../middlewares/auth')

// Import controllers which we use below as arguments in router actions
const { create } = require('../controllers/product')

// Routes (endpoints)
router.post('/product', authCheck, adminCheck, create)

module.exports = router
