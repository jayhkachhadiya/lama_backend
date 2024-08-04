const projectModel = require("../models/projectModel");
const uploadModel = require("../models/uploadModel");
const userModel = require("../models/userModel");

exports.addUploadDetail = async (req, res) => {
  try {
    const { name, description, projectId } = req.body;
    console.log(
      name,
      description,
      projectId,
      "name, description, projectIdname, description, projectId"
    );
    const userId = req.user.id;
    console.log(userId, "userId userId ");
    const userData = await userModel.findById(userId);
    const projectData = await projectModel.findById(projectId);
    console.log(projectData, "productData ");
    console.log(userData, "userDatauserData");
    if (userData) {
      if (projectData) {
        const upload = new uploadModel({
          name,
          description,
          userId,
          projectId,
        });
        await upload.save();
        return res.status(200).json({
          message: "add successfully ",
        });
      } else {
        return res.status(400).json({
          message: "projectData not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({
      message: "internal server error ",
    });
  }
};

exports.getUploadDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await uploadModel.findById(id);
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

exports.getUploadDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;
    console.log(typeof projectId, "projectIdprojectIdprojectId");
    const user = await userModel.findById(userId);
    const project = await projectModel.findById(projectId);
    console.log(project, "nidhlo");
    if (user) {
      if (project) {
        console.log(projectId, "projectIdprojectIdprojectIdprojectId");
        const uploads = await uploadModel.find({ projectId });
        console.log(uploads, "uploadsuploadsuploadsuploads");
        return res.status(200).json({
          uploads,
        });
      } else {
        return res.status(400).json({
          message: "project not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error, "errorerror");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.editDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadDetail = await uploadModel.findById(id);
    if (!uploadDetail) {
      return res.status(404).json({
        message: "Upload detail not found",
      });
    } else {
      const updatedDestiDetail = await uploadModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      return res.status(200).json({
        message: "Update successfully",
        data: updatedDestiDetail,
      });
    }
  } catch (error) {
    console.log(error, "errorerror");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await uploadModel.findById(id);
    if (response) {
      await uploadModel.findOneAndDelete(response._id, { id });
      return res.status(200).json({
        message: "record deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "data not found",
      });
    }
  } catch (error) {
    console.log(error, "errorerror");
    return res.status(500).json({
      message: "internal server error ",
    });
  }
};
