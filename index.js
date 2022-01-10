const express = require("express");
const userRoutes = require("./routes/user");
const app = express();
var cors = require("cors");

const port = 5000;
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Your app is running on port ${port}`);
});
