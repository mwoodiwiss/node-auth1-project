const express = require("express");
const db = require("../data/db");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/a", (req, res) => {
    res.status(200).json( { message: 'Welcome to the restricted route!' } );
});

module.exports = router;