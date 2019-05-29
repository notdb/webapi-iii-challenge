const express = "express";
const dbUser = require("./userDb.js");
const router = require("express").Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const user = await dbUser.get(req.query);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the users"
    });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  try {
    const users = await dbUser.getById(req.params.id);

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the user"
    });
  }
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const user = await dbUser.getById(req.params.id);
  console.log(user);

  if (user === undefined) {
    res.status(404).json({ message: "user not found" });
  } else {
    next();
  }
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
