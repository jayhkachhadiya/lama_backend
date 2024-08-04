const projectModel = require("../models/projectModel");

exports.addProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    console.log(projectName, "projectNameprojectNameprojectName");
    if (projectName) {
      const project = new projectModel({
        projectName,
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
    const response = await projectModel.find();
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
