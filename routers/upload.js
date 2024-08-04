const express = require("express");
const {
  getUploadDetail,
  getUploadDetailById,
  addUploadDetail,
  editDetail,
  deleteDetail,
} = require("../controllers/upload");
const checkUserAuth = require("../middleware/auth");
const router = express.Router();

router.get("/:projectId", checkUserAuth, getUploadDetail);
router.get("/data/:id", checkUserAuth, getUploadDetailById);
  
router.put("/:id", checkUserAuth, editDetail);
router.delete("/:id", checkUserAuth, deleteDetail);
router.post("/add", checkUserAuth, addUploadDetail);

module.exports = router;
