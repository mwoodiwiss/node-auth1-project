const express = require("express");
const db = require("../data/db");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get("/", restricted, (req, res) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve users" });
    });
});

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials: You shall not pass!' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
} 

module.exports = router;
