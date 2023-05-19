const Subcategory = require('../model/subcategory')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    // Get the category name from frontend
    const { name } = req.body
    // Create the new category in db using the model
    const subcategory = await new Subcategory({
      name: name,
      slug: slugify(name),
    }).save()
    // Send the response
    res.json(subcategory)
  } catch (error) {
    // console.log(error)
    res.status(400).send('Create subcategory failed')
  }
}

// Find all created categories and sort them by newest to latest
exports.list = async (req, res) =>
  res.json(await Subcategory.find({}).sort({ createdAt: -1 }).exec())

// Find one category by slug name, which we get form params (the last part of the endpoint '/category/:slug')
exports.read = async (req, res) => {
  let subcategory = await Subcategory.findOne({ slug: req.params.slug }).exec()
  res.json(subcategory)
}

exports.update = async (req, res) => {
  const { name } = req.body
  try {
    // Get the category name from frontend
    // Find the category in db by slug and update the name and slug with the one we get from front end (new: true sends the category after updating)
    const updated = await Subcategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    )
    res.json(updated)
  } catch (error) {
    // console.log(error)
    req.status(400).send('Update subcategory failed')
  }
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Subcategory.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (error) {
    // console.log(error)
    req.status(400).send('Delete subcategory failed')
  }
}