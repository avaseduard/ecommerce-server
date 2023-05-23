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
exports.read = async (req, res) => res.json(await Product.find({}))
