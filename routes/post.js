const router = require("express").Router();
const { publicPosts, PrivatePosts } = require("../db");

router.get("/public", (req, res) => {
  res.send(publicPosts);
});

module.exports = router;
