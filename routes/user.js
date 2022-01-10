var express = require("express");
const { User } = require("../models");
var router = express.Router();

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const errorResponse = (res, error) => {
  console.log(error);
  return res.status(500).send({
    status: "server error",
  });
};

//get users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.send({
      status: "user succesfully fetched",
      users,
    });
  } catch (error) {
    errorResponse(error, res);
  }
});

//get user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    res.send({
      status: user ? "user succesfully fetched" : "user not found",
      user,
    });
  } catch (error) {
    errorResponse(error, res);
  }
});

//create user
router.post("/", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).send({
        status: "validation error",
      });
    }

    // console.log(req.body);
    const user = await User.create({
      fullName: fullName,
      email,
      password,
      role,
    });

    res.send({
      status: "user succesfully created",
      user,
    });
  } catch (error) {
    errorResponse(error, res);
  }
});

//update user
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (isEmpty(body)) {
      return res.send({
        status: "validation error",
      });
    }

    console.log(body);

    //cek jika id exist
    const findUserById = await User.findOne({
      where: {
        id,
      },
    });

    //jika user tidak ketemu
    if (!findUserById) {
      return res.send({
        status: "user not found",
      });
    }

    //jika user ketemu update
    //update yg dikirim dari body
    const updateUser = await User.update(body, {
      where: {
        id,
      },
    });

    const findUserByIdAfterUpdate = await User.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: "user successfully update",
      user: findUserByIdAfterUpdate,
    });

    // console.log("updated user", updateUser);
  } catch (error) {
    errorResponse(error, res);
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //cek jika id exist
    const findUserById = await User.findOne({
      where: {
        id,
      },
    });

    //jika user tidak ketemu
    if (!findUserById) {
      return res.send({
        status: "user not found",
      });
    }

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "user succesfully delete",
    });
  } catch (error) {
    errorResponse(error, res);
  }
});

module.exports = router;
