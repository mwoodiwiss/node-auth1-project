const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const db = require("../data/db");

const usersRouter = require("../users/users-router.js");
const registerRouter = require("../register/register-router.js");
const loginRouter = require("../login/login-router.js");
const restrictedRouter = require("../restricted/restricted-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/restricted", restricted, restrictedRouter);

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
            res
              .status(401)
              .json({ message: "Invalid Credentials: You shall not pass!" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: "Unexpected error" });
        });
    } else {
      res.status(400).json({ message: "No credentials provided" });
    }
}

module.exports = server;
