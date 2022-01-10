const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const port = 5000;
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Your app is running on port ${port}`);
});
