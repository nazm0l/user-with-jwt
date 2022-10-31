const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).json("No token found");
  }
  try {
    let user = await JWT.verify(token, "tes4554adaddawwffa");
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json("Token Invalid. Access denied");
  }
};
