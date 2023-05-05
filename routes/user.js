const express = require("express");

const router = express.Router();

router.get("/user", (request, response) => {
  response.json({
    data: "You hit the user API endpoint",
  });
});

module.exports = router;
