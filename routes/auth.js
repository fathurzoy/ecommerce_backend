const express = require("express");
const { User } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const errorResponse = (res, error) => {
  console.log(error);
  return res.status(500).send({
    status: "server error",
  });
};

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { body } = req;
    const { fullName, email, password } = body;

    const isUserExistedByEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (isUserExistedByEmail) {
      return res.status(401).send({
        message: "Email Already Existed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      password: hashedPassword,
      email,
      role: "user",
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET_KEY
    );

    res.send({
      message: "User Succesfully Registered",
      data: {
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    errorResponse(res, error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

    const isUserExistedByEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (!isUserExistedByEmail) {
      return res.status(401).send({
        message: "Invalid Login",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExistedByEmail.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid Login",
      });
    }

    const token = jwt.sign(
      {
        id: isUserExistedByEmail.id,
      },
      JWT_SECRET_KEY
    );

    res.send({
      message: "User Succesfully Registered",
      data: {
        user: {
          fullName: isUserExistedByEmail.fullName,
          email: isUserExistedByEmail.email,
          role: isUserExistedByEmail.role,
        },
        token,
      },
    });
  } catch (error) {
    errorResponse(res, error);
  }
});

module.exports = router;
