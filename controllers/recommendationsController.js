const Recommendation = require("../models/recommendationModel");
const factory = require("./handlerFactory");

exports.setPlantUserIds = (req, res, next) => {
  if (!req.body.plant) req.body.plant = req.params.plantId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getRecommendations = factory.getAll(Recommendation);
exports.createRecommendation = factory.createOne(Recommendation);
exports.updateRecommendation = factory.updateOne(Recommendation);
exports.deleteRecommendation = factory.deleteOne(Recommendation);
