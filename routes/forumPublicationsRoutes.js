const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllForumPublications,
  createForumPublication,
  deleteForumPublication,
  setUserId,
  getForumPublicationById,
} = require("../controllers/forumPublicationsController");

const router = express.Router();

router.use(protect);

router.get("/allpublications", getAllForumPublications);
router.get("/publication/:id", getForumPublicationById);
router.post("/createpublication", setUserId, createForumPublication);
router.delete("/delete/:id", restrictTo("admin"), deleteForumPublication);

module.exports = router;
