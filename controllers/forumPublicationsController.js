const ForumPublication = require("../models/forumPublicationModel");
const factory = require("./handlerFactory");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllForumPublications = factory.getAll(ForumPublication);
exports.getForumPublicationById = factory.getOne(ForumPublication);
exports.createForumPublication = factory.createOne(ForumPublication);
exports.deleteForumPublication = factory.deleteOne(ForumPublication);
