const express = require("express");
const {
  addProject,
  getProject,
  getProjectById,
} = require("../controllers/project");
const router = express.Router();

router.get("/", getProject);
router.get("/:id", getProjectById);
router.post("/add", addProject);

module.exports = router;
