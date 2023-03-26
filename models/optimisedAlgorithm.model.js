const { Schema, model } = require("mongoose");

const optimisedSortingAlgorithmSchema = new Schema(
   {
      sort: {
         type: Schema.Types.ObjectId,
         ref: "Sort",
         required: true,
      },
      language: {
         type: String,
         required: true,
      },
      code: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const OptimisedSortingAlgorithm = model(
   "OptimisedSortingAlgorithm",
   optimisedSortingAlgorithmSchema
);

module.exports = OptimisedSortingAlgorithm;
