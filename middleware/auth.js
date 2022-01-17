const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token)
      return res.status(403).send({
        message: "Access Denied",
      });

    const tokenWithoutBearer = token.replace("Bearer ", "");
    // console.log({ tokenWithoutBearer });

    const verified = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECTRET_KEY
    );

    req.userId = verified;

    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
