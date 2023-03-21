const ForumPublication = require("../models/forumPublicationModel");
const catchAsync = require("../utilities/catchAsync");
const factory = require("./handlerFactory");

const AppError = require("../utilities/appError");

exports.getAllForumPublications = catchAsync(async (req, res, next) => {
  const forumPublications = await ForumPublication.find();

  res.status(200).json({
    status: "success",
    results: forumPublications.length,
    data: { forumPublications },
  });
});

exports.createForumPublication = catchAsync(async (req, res, next) => {
  const newForumPublication = await ForumPublication.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Publicacion creada correctamente",
    data: { publication: newForumPublication },
  });
});

exports.deleteForumPublication = factory.deleteOne(ForumPublication);
