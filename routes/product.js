const express = require('express')
const router = express.Router()

// Middlewares - check the token and check for admin role
const { authCheck, adminCheck } = require('../middlewares/auth')

// Import controllers which we use below as arguments in router actions
const { create, listAll } = require('../controllers/product')

// Routes (endpoints)
router.post('/product', authCheck, adminCheck, create)
router.get('/products/:count', listAll)

module.exports = router
