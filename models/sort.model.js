const { Schema, model } = require("mongoose");

const sortSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      alogorithm: {
         type: String,
      },
      tcBest: {
         type: String,
         required: true,
      },
      tcWorst: {
         type: String,
         required: true,
      },
      tcAverage: {
         type: String,
      },
      spaceComplexity: {
         type: String,
      },
      stability: {
         type: String,
         enum: ["yes","no"]
      },
   },
   { timestamps: true }
);

sortSchema.virtual("optimisedSortingAlgorithm", {
    ref: "OptimisedSortingAlgorithm",
    localField: "_id",
    foreignField: "sort",
});

sortSchema.virtual("sortingAlgorithm", {
    ref: "SortingAlgorithm",
    localField: "_id",
    foreignField: "sort",
});

sortSchema.virtual("working", {
    ref: "Working",
    localField: "_id",
    foreignField: "sort",
});

const Sort = model("Sort", sortSchema);

module.exports = Sort;
