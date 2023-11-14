const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/authorization");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

const {
  create_user,
  user_exists,
  get_users,
  password_matches,
  get_userId,
} = require("../methods/user_methods");


router.get("/users", authorization, async (req, res) => {
  return res.status(200).send(await get_users());
});

router.get("/logout", authorization, (req, res) => {
  return res.clearCookie("user_token").status(200).send("Logout Success!");
});

router.get("/is_logged_in", authorization, (req, res) => {
  return res.status(200).send("We Logged In");
});

router.post("/add_user", jsonParser, async (req, res) => {
  const username = req.body.username;
  if (await user_exists(username)) {
    return res.status(409).send({ user: "exists" });
  } else {
    const password = req.body.password;
    create_user(username, password);
    return res.status(200).send({ user: "created" });
  }
});

router.post("/login", jsonParser, async (req, res) => {
  const username = req.body.username;

  if (await user_exists(username)) {
    const userId = await get_userId(username);
    const password = req.body.password;
    if (await password_matches(username, password)) {
      const token = jwt.sign({ userId: userId.id }, process.env.JWT_SECRET_KEY);
      return res
        .cookie("user_token", token, {
          // secure: true,
          sameSite: "lax",
          httpOnly: true,
        })
        .status(200)
        .send("Successful Login");
    } else {
      return res.status(403).send("Incorrect Credentials");
    }
  } else {
    return res.status(403).send("Incorrect Credentials");
  }
});

module.exports = router;
