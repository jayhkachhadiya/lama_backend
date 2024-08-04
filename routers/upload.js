const express = require("express");
const {
  getUploadDetail,
  getUploadDetailById,
  addUploadDetail,
  editDetail,
  deleteDetail,
} = require("../controllers/upload");
const router = express.Router();

router.get("/:projectId", getUploadDetail);
router.get("/data/:id", getUploadDetailById);

router.put("/:id", editDetail);
router.delete("/:id", deleteDetail);
router.post("/add", addUploadDetail);

module.exports = router;
