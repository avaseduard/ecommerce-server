const express = require('express')
const router = express.Router()

// Middlewares - check the token and check for admin role
const { authCheck, adminCheck } = require('../middlewares/auth')

// Import controllers which we use below as arguments in router actions
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
} = require('../controllers/product')

// Routes (endpoints)
router.post('/product', authCheck, adminCheck, create)
router.get('/products/total', productsCount)
router.get('/products/:count', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)
router.get('/product/:slug', read)
router.put('/product/:slug', authCheck, adminCheck, update)
router.post('/products', list)

module.exports = router
