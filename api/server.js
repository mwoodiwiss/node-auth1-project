const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const db = require("../data/db");
const session = require('express-session');

const registerRouter = require("../register/register-router.js");
const loginRouter = require("../login/login-router.js");
const restrictedRouter = require("../restricted/restricted-router.js");
const server = express();

const sessionConfig = {
  name: 'foo',
  secret: '1234567890',
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/restricted", restricted, restrictedRouter);

function restricted(req, res, next) {
    if (req.session && req.session.user) {
     next();
    } else {
      res.status(401).json({ message: "User not found" });
    }
}

module.exports = server;
