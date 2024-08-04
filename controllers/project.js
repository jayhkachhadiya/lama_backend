const projectModel = require("../models/projectModel");
const userModel = require("../models/userModel");

exports.addProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    console.log(projectName,"projectNameprojectNameprojectName")
    const userId = req.user.id;
    if (projectName) {
      const project = new projectModel({
        projectName,
        userId,
      });
      await project.save();
      return res.status(200).json({
        message: "project add successfully ",
      });
    } else {
      return res.status(400).json({
        message: "projectName can't be empty",
      });
    }
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({
      message: "internal server error ",
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);

    if (userData) {
      const response = await projectModel.find({ userId: userId });
      return res.status(200).json({
        response,
      });
    } else {
      return res.status(400).json({
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error, "errorerror");
    return res.status(500).json({
      message: "internal server error ",
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await projectModel.findById(id);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error, "errorerror");
    return res.status(500).json({
      message: "internal server error ",
    });
  }
};
