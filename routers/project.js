const express = require("express");
const {
  addProject,
  getProject,
  getProjectById,
} = require("../controllers/project");
const checkUserAuth = require("../middleware/auth");
const router = express.Router();

router.get("/", checkUserAuth, getProject);
router.get("/:id", checkUserAuth, getProjectById);
router.post("/add", checkUserAuth, addProject);

module.exports = router;
