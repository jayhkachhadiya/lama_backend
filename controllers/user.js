const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, userName, password, confirmPassword } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user, "useruser");
    if (user) {
      return res.status(400).json({
        message: "user already register",
      });
    } else {
      if (email && userName && password && confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        if (password === confirmPassword) {
          const doc = new userModel({
            email,
            userName,
            password: hashPassword,
          });
          await doc.save();
          return res.status(200).json({
            message: "Register successfully",
          });
        } else {
          return res.status(200).json({
            message: "password and confirm password does not matches",
          });
        }
      } else {
        return res.status(400).json({
          message: "all field are required",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "internal server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user, "useruseruser");
  try {
    if (user) {
      if (email && password) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch, "isMatch isMatch ");
        if (user.email === email && isMatch) {
          const secret = process.env.JWT_SECRATE_KEY;
          const token = jwt.sign({ userID: user._id }, secret, {
            expiresIn: "5d",
          });
          return res.status(200).json({
            message: "login success",
            token: token,
          });
        } else {
          return res.status(400).json({
            message: "user not found",
          });
        }
      } else {
        return res.status(400).json({
          message: "All filled are required",
        });
      }
    } else {
      return res.status(400).json({
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error, "errorerrorerror");
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
