const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllPlants,
  createPlant,
  deletePlant,
  getPlantById,
  updatePlant,
  setUserId,
} = require("../controllers/plantsController");
const recommendationRouter = require("./recommendationsRoutes");

const router = express.Router();

router.use("/:plantId/recommendations", recommendationRouter);

router.use(protect);

router.get("/getall", getAllPlants);
router.get("/getbyid/:id", getPlantById);
router.post("/createplant", setUserId, createPlant);
router.patch("/updateplant/:id", updatePlant);
router.delete("/delete/:id", deletePlant);

module.exports = router;
