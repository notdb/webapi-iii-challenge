const express = "express";
const dbUser = require("./userDb.js");
const postUser = require("../posts/postDb.js");
const router = require("express").Router();

router.post("/", validateUser, async (req, res) => {
  try {
    const users = await dbUser.insert(req.body);
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the users"
    });
  }
});

router.post("/:id/posts", validatePost, async (req, res) => {
  try {
    const user = await postUser.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the users"
    });
  }
});

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
    const user = await dbUser.getById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the user"
    });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const user = await dbUser.getUserPosts(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the users"
    });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const user = await dbUser.remove(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the users"
    });
  }
});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const user = await dbUser.getById(req.params.id);
  req.user = req.params.id;

  if (user === undefined) {
    res.status(404).json({ message: "user not found" });
  } else {
    next();
  }
}

async function validateUser(req, res, next) {
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).json({
      message: "missing user data"
    });
  } else {
    next();
  }
}

async function validatePost(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    });
  } else {
    next();
  }
}

module.exports = router;
