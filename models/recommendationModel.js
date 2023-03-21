const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
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
      required: [true, "La recomendacion debe pertenecer a un usuario"],
    },
    plant: {
      type: mongoose.Schema.ObjectId,
      ref: "Plant",
      required: [true, "La recomendacion debe pertenecer a una planta"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

recommendationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname lastname",
  }).populate({
    path: "plant",
    select: "plantname",
  });

  next();
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = Recommendation;
