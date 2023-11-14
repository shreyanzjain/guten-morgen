const jwt = require("jsonwebtoken");
const authorization = (req, res, next) => {
  const token = req.cookies.user_token;
  if (token) {
    try {
      const token_data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = token_data.userId;
      return next();
    } catch {
      return res.status(403).send("Unauthorized Token");
    }
  } else {
    return res.status(403).send("Unauthorized. No token found.");
  }
};

module.exports = { authorization };
