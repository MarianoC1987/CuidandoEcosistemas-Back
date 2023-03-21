const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  createRecommendation,
  getRecommendations,
  deleteRecommendation,
  updateRecommendation,
  setPlantUserIds,
} = require("../controllers/recommendationsController");

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route("/")
  .get(getRecommendations)
  .post(setPlantUserIds, createRecommendation);

router.delete("/delete/:id", deleteRecommendation);
router.patch("/update/:id", updateRecommendation);

module.exports = router;
