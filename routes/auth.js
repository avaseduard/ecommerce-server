const express = require("express");

const router = express.Router();

// import controller which we use below as second argument is router.get
const { createOrUpdateUser } = require("../controllers/auth");

router.get("/create-or-update-user", createOrUpdateUser);

module.exports = router;
