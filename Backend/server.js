const app = require("./src/app.js");
require("dotenv").config();

app.listen(3000, () => {
  console.log("Server is running at PORT 3000");
});
