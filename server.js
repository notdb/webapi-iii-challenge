const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ messageOfTheDay: "test" });
});

//custom middleware

function logger(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  next();
}

module.exports = server;
