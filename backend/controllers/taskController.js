const express = require("express");
const taskSchema = require("../models/task");
const router = express.Router();

router.get("/tasks", (req, res) => {
  taskSchema
    .find()
    .then((data) => {res.json(data)
      console.log(data)})
    .catch((e) => res.json(e));
});
router.post("/tasks",  (req, res) =>  {
  taskSchema(req.body)
    .save()
    .then((data) => res.json(data))
    .catch((e) => res.json(e));
});

router.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  taskSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((e) => res.json(e));
});

router.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const {name, completed, checked} = req.body
  taskSchema
    .updateOne(
      { _id: id },
      { $set: { name: name, completed: completed, checked: checked } }
    )
    .then((data) =>{ res.json(data.id)
    console.log(data)})
    .catch((e) => res.json(e));
});

module.exports = router;
