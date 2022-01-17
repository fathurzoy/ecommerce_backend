const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

//get users
router.get("/", getUsers);

//get user by id
router.get("/:id", getUser);

//create user
router.post("/", createUser);

//update user
router.patch("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

module.exports = router;
