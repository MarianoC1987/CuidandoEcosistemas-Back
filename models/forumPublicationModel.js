const mongoose = require("mongoose");

const forumPublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "La publicacion debe tener un titulo"],
    },
    subtitle: {
      type: String,
    },
    text: {
      type: String,
      required: [true, "La publicacion no puede estar vacia"],
    },
    img: {
      type: String,
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
