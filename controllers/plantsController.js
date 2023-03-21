const Plants = require("../models/plantsModel");
const factory = require("./handlerFactory");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllPlants = factory.getAll(Plants);
exports.getPlantById = factory.getOne(Plants, { path: "recommendations" });
exports.createPlant = factory.createOne(Plants);
exports.updatePlant = factory.updateOne(Plants);
exports.deletePlant = factory.deleteOne(Plants);
