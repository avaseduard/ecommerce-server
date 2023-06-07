const Product = require('../model/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    // Set the slub to req body, by slugifying the title (the slug is not coming from front end)
    req.body.slug = slugify(req.body.title)
    // Save the new product in database
    const newProduct = await new Product(req.body).save()
    // Send the response
    res.json(newProduct)
  } catch (error) {
    console.log('PRODUCT UPDATE FAILED -->', error)
    res.status(400).json({
      error: error.message,
    })
  }
}

// Find all created products and sort them by newest to latest
exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subcategories')
    .sort([['createdAt', 'desc']])
    .exec()
  res.json(products)
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec()
    res.json(deleted)
  } catch (error) {
    console.log('PRODUCT REMOVE FAILED -->', error)
    return res.status(400).send('PRODUCT REMOVE FAILED')
  }
}

exports.read = async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
  })
    .populate('category')
    .populate('subcategories')
    .exec()
  res.json(product)
}

exports.update = async (req, res) => {
  try {
    // If we have a new title coming from front end, set the slug to req body
    if (req.body.title) req.body.slug = slugify(req.body.title)
    // Update the product in database
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug }, // query db by slug
      req.body, // update with what we get from front end body
      { new: true } // return updated version of product from db
    ).exec()
    // Send the response with updated product
    res.json(updated)
  } catch (error) {
    console.log('PRODUCT UPDATE FAILED -->', error)
    res.status(400).json({
      error: error.message,
    })
  }
}

// To list new arrivals and best sellers on home page
exports.list = async (req, res) => {
  try {
    // Destructure the sort, order and limit that we receive from front end
    const { sort, order, page } = req.body // {createdAt/ updatedAt, asc/ desc, 3/ 5/ 10}
    const currentPage = page || 1
    const perPage = 3
    // Get products from db based on the page no. from frontend and no. of items per page
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subcategories')
      .sort([[sort, order]])
      .limit(perPage)
      .exec()
    // Send found products to front end
    res.json(products)
  } catch (error) {
    console.log('LIST NEW ARRIVALS OR BEST SELLERS FAILED -->', error)
  }
}

// To get the numbers of products from db for pagination
exports.productsCount = async (req, res) => {
  // let total = await Product.find({}).estimatedDocumentCount().exec()
  let total = await Product.count()
  res.json(total)
}
