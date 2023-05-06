const admin = require('../firebase')

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers) // token
  // Verify token in firebase
  try {
    // If successful, it will return the user
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    console.log('FIREBASE USER FROM AUTHCHECK', firebaseUser)
    // Add the firebase user to the req argument, so we can access it where needed
    req.user = firebaseUser
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      error: 'Invalid or expired token',
    })
  }
}
