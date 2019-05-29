const express = require("express");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use("/users", userRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(Date.now());
}

module.exports = server;
