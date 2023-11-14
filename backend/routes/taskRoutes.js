const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/authorization");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const {
  add_task,
  get_user_tasks,
  delete_task,
} = require("../methods/taskMethods");

router.post("/add_task", authorization, jsonParser, (req, res) => {
  const { title, description } = req.body;
  try {
    add_task(req.userId, title, description);
  } catch {
    return res.status(401).send("Unsuccessful.");
  } finally {
    return res.status(201).send("Successful.");
  }
});

router.delete("/remove_task/:id", authorization, async (req, res) => {
  const id = req.params.id;
  await delete_task();
  return res.status(200).send(`Task with task id ${id} deleted successfuly`);
});

router.get("/tasks", authorization, async (req, res) => {
  res.status(200).send(await get_user_tasks(req.userId));
});

module.exports = router;
