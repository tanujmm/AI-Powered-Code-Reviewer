// const express = require("express");
// const aiRoutes = require("./routes/ai.routes.js");
// const app = express();
// const cors = require("cors");

// app.use(cors());
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.use(express.json());

// app.use("/ai", aiRoutes);

// module.exports = app;

const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes.js");

const app = express();

const allowedOrigins = [
  "https://ai-powered-code-reviewer-frontend-tle8.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/ai", aiRoutes);

module.exports = app;
