const { Schema, model } = require("mongoose");

const sortingAlgorithmSchema = new Schema(
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

const SortingAlgorithm = model(
    "SortingAlgorithm",
    sortingAlgorithmSchema
);

module.exports = SortingAlgorithm;
