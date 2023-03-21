const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllForumPublications,
  createForumPublication,
  deleteForumPublication,
} = require("../controllers/forumPublicationsController");

const router = express.Router();

router.get("/allpublications", getAllForumPublications);
router.post("/createpublication", protect, createForumPublication);
router.delete(
  "/delete/:id",
  protect,
  restrictTo("admin"),
  deleteForumPublication
);

module.exports = router;
