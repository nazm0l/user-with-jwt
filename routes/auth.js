const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");

//Get all user
router.get("/users", (req, res) => {
  res.send(users);
});

//Add a new user
router.post(
  "/signup",
  [
    check("email", "Enter a valid Email").isEmail(),
    check("password", "Enter more than 6 char ").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    //Email and Pass Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //validate existing user
    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      res.status(400).json({
        errors: [
          {
            msg: "User already exist",
          },
        ],
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      email,
      password: hashedPassword,
    });

    console.log(email, password, hashedPassword);
    res.send(users);
  }
);

module.exports = router;
