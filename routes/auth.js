const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");

router.post(
  "/signup",
  [
    check("email", "Enter a valid Email").isEmail(),
    check("password", "Enter more than 6 char ").isLength({ min: 6 }),
  ],
  (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    console.log(email, password);
    res.send("got it");
  }
);

module.exports = router;
