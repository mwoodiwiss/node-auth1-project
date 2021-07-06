const express = require("express");
const db = require("../data/db");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hash;
  db("users")
    .insert(newUser)
    .then(() => {
      res.status(201).json({ message: `User Created!` });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to create user." });
    });
});

module.exports = router;
