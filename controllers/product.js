const Product = require('../model/product')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    console.log(req.body)
    // Set the slub to req body, by slugifying the title (the slug is not coming from front end)
    req.body.slug = slugify(req.body.title)
    // Save the new product in database
    const newProduct = await new Product(req.body).save()
    // Send the response
    res.json(newProduct)
  } catch (error) {
    console.log(error)
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
