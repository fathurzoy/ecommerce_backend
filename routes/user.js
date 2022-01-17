const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middleware/auth");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

//get users
router.get("/", checkAuth, getUsers);

//get user by id
router.get("/:id", checkAuth, getUser);

//create user
router.post("/", checkAuth, createUser);

//update user
router.patch("/:id", checkAuth, updateUser);

//delete user
router.delete("/:id", checkAuth, deleteUser);

module.exports = router;
