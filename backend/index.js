// import user_methods
const {
  create_user,
  user_exists,
  get_users,
  password_matches,
  get_userId,
  add_task,
  get_user_tasks,
} = require("./methods/user_methods");

// import node_modules that are required
const express = require("express");
const https = require("https");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// load .env contents to process.env
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors({
  origin: 'https://127.0.0.1:5173',
  credentials: true
}));
app.use(cookieParser());

const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
};

const httpsServer = https.createServer(options, app);

// authorization dependency
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

app.get("/", (req, res) => {
  return res.send("Home");
});

app.post("/add/user/", jsonParser, (req, res) => {
  const username = req.body.username;
  if (user_exists(username)) {
    return res.status(409).send({ user: "exists" });
  } else {
    const password = req.body.password;
    create_user(username, password);
    return res.status(200).send({ user: "created" });
  }
});

app.get("/users/", authorization, async (req, res) => {
  return res.status(200).send(await get_users());
});

app.post("/login/", jsonParser, async (req, res) => {
  const username = req.body.username;

  if(await user_exists(username)) {
    const userId = await get_userId(username);
    const password = req.body.password;
    if (await password_matches(username, password)) {
      const token = jwt.sign({ userId: userId.id }, process.env.JWT_SECRET_KEY);
      return res
        .cookie("user_token", token, {
          secure: true,
          sameSite: "lax",
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

app.post("/add/task/", authorization, jsonParser, (req, res) => {
  const { title, description } = req.body;
  try {
    add_task(req.userId, title, description);
  } catch {
    return res.status(401).send("Unsuccessful.");
  } finally {
    return res.status(200).send("Successful.");
  }
});

app.get("/tasks/", authorization, async (req, res) => {
  res.status(200).send(await get_user_tasks(req.userId))
})

httpsServer.listen(port, () => {
  console.log(`Server running at https://127.0.0.1:${port}/`);
});
