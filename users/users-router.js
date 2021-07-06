const express = require("express");
const db = require("../data/db");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve users" });
    });
});

module.exports = router;
