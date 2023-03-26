const { Schema, model } = require("mongoose");

const workingSchema = new Schema(
   {
      image: {
         type: String,
      },
      subHeading: {
         type: String,
      },
      text: {
         type: String,
      },
      section: {
         type: Number,
      },
      sort: {
         type: Schema.Types.ObjectId,
         ref: "Sort",
         required: true,
      },
   },

   { timestamps: true }
);

const Working = model("Working", workingSchema);

module.exports = Working;
