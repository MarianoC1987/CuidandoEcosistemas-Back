const mongoose = require("mongoose");

const plantsSchema = new mongoose.Schema(
  {
    plantname: {
      type: String,
      required: [true, "Debe incluir un nombre de planta"],
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // recommendations: {
    //   type: String,
    //   trim: true,
    // },
    img: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    climate: {
      type: String,
      trim: true,
    },
    createdat: {
      type: Date,
      default: Date.now(),
      //NO APARECE EN LOS RESULTADOS
      select: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "La planta debe pertenecer a un usuario"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

plantsSchema.virtual("recommendations", {
  ref: "Recommendation",
  foreignField: "plant",
  localField: "_id",
});

const Plant = mongoose.model("Plant", plantsSchema);

module.exports = Plant;
