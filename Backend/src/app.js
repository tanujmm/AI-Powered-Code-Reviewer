const express = require("express");
const aiRoutes = require("./routes/ai.routes.js");
const app = express();
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());

app.use("/ai", aiRoutes);

module.exports = app;
