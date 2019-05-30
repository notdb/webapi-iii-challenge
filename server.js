const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use("/users", userRouter);

server.get("/", logger, (req, res) => {
  res.status(200).json({ messageOfTheDay: process.env.MOTD });
});

//custom middleware

function logger(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(Date.now());
  next();
}

module.exports = server;
