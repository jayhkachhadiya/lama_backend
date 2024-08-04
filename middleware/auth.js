const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRATE_KEY);
      req.user = await userModel.findById(userID).select("-password");
      console.log(req.user,"req.userreq.user");
      next();
    } catch (error) {
      res
        .status(400)
        .send({ status: "failed", message: "unauthorised user", error: error });
    }
  } else {
    res
      .status(400)
      .send({ status: "failed", message: "unauthorised user , no token" });
  }
};

module.exports = checkUserAuth;