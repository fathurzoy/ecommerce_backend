exports.errorResponse = (res, error) => {
  console.log(error);
  return res.status(500).send({
    status: "server error",
  });
};
