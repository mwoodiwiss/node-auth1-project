const express = require("express");
const db = require("../data/db");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  let { username, password } = req.body;

  db("users")
    .where({ username })
    .first()
    .then(users => {
      if (users && bcrypt.compareSync(password, users.password)) {
        res.status(200).json({ message: `Welcome ${users.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
