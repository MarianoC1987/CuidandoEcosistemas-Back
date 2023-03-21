const mongoose = require("mongoose");

const forumPublicationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "La publicacion no puede estar vacia"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "El posteo debe pertenecer a un usuario"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

forumPublicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname lastname",
  });

  next();
});

const ForumPublication = mongoose.model(
  "ForumPublication",
  forumPublicationSchema
);

module.exports = ForumPublication;
