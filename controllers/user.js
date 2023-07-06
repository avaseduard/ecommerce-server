const User = require('../model/user')
const Product = require('../model/product')
const Cart = require('../model/cart')

exports.userCart = async (req, res) => {
  const { cart } = req.body
  let products = []
  // Find user in db
  const user = await User.findOne({ email: req.user.email }).exec()
  // Check if user already has a cart in db
  let existingCart = await Cart.findOne({ orderedBy: user._id }).exec()
  // Reset the cart content
  if (existingCart) existingCart.remove()
  // Create an object with all needed properties
  for (let index = 0; index < cart.length; index++) {
    const object = {}
    // Get id, count and color from fe and assign to object
    object.product = cart[index]._id
    object.count = cart[index].count
    object.color = cart[index].color
    // Get price from db and assign to object
    let { price } = await Product.findById(cart[index]._id)
      .select('price')
      .exec()
    object.price = price
    // Push object to products array
    products.push(object)
  }
  // Find the total price of the cart
  let cartTotal = 0
  for (let index = 0; index < products.length; index++) {
    cartTotal = cartTotal + products[index].price * products[index].count
  }
  // Create the new cart with all info
  let newCart = await new Cart({
    products: products,
    cartTotal: cartTotal,
    orderedBy: user._id,
  })
  // Send the ok to fe
  res.json({ ok: true })

  console.log('NEW CART -->', newCart)
}

exports.getUserCart = async (req, res) => {
  // Find user in db based on email form fe
  const user = await User.findOne({ email: req.user.email }).exec()
  // Find user's cart and populate the products
  let cart = await Cart.findOne({ orderedBy: user._id }).populate(
    'products.product',
    '_id title price totalAfterDiscount'
  ).exec()
  // Destructure what we need in fe from cart
  const {products, cartTotal, totalAfterDiscount} = cart
  // Send response to fe
  res.json({products, cartTotal, totalAfterDiscount})
}
