const projectModel = require("../models/projectModel");
const uploadModel = require("../models/uploadModel");

exports.addUploadDetail = async (req, res) => {
  try {
    const { name, description, projectId } = req.body;
    const projectData = await projectModel.findById(projectId);
    console.log(projectData, "productData ");
    if (projectData) {
      const upload = new uploadModel({
        name,
        description,
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
    const { projectId } = req.params;
    const project = await projectModel.findById(projectId);
    if (project) {
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
