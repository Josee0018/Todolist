const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./controllers/taskController");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use("/api", [taskRoutes]);
mongoose
  .connect(process.env.URI)
  .then(() => console.log("contected to mongoDB ❤️"))
  .catch((e) => console.log("error to db" + e));

app.listen(PORT, () => {
  console.log("working " + PORT);
});
