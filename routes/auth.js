const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

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
      return res.status(400).json({
        errors: [
          {
            msg: "User already exist",
          },
        ],
      });
    }

    //Hashing the pass
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign(
      {
        email,
      },
      "tes4554adaddawwffa",
      { expiresIn: 3600000 }
    );

    res.send(users);
  }
);

//Login user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //finding user with email to db
  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  //comparing user pass with hash pass
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  res.send("Successfully logged in");
});

module.exports = router;
