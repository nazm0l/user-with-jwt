const router = require("express").Router();

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("got it");
});

module.exports = router;
