const Category = require('../model/category')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    // Get the category name from frontend
    const { name } = req.body
    // Create the new category in db using the model
    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save()
    // Send the response
    res.json(category)
  } catch (error) {
    console.log(error)
    req.status(400).send('Create category failed')
  }
}

exports.list = async (req, res) => {
  //
}

exports.read = async (req, res) => {
  //
}

exports.update = async (req, res) => {
  //
}

exports.remove = async (req, res) => {
  //
}
