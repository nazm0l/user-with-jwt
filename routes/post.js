const router = require("express").Router();
const { publicPosts, PrivatePosts } = require("../db");
const checkAuth = require("../middleware/checkAuth");

router.get("/public", (req, res) => {
  res.send(publicPosts);
});

router.get("/private", checkAuth, (req, res) => {
  res.send(PrivatePosts);
});

module.exports = router;
