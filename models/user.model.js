const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         lowercase: true,
         unique: true,
         required: true,
      },
      role: {
         type: String,
         default: "user",
         enum: ["user", "admin"],
      },
      password: {
         type: String,
         required: true,
      },
      jwtToken: {
         type: String,
      },
   },
   { timestamps: true }
);

userSchema.methods.toJSON = function () {
   const user = this;
   const userObj = user.toObject();

   delete userObj.password;
   delete userObj.jwtToken;

   return userObj;
};

userSchema.methods.generateAuthToken = async function () {
   try {
      const user = this;
      const jwtToken = jwt.sign(
         { _id: user._id.toString(), email: user?.email?.toString() },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         }
      );

      user.jwtToken = jwtToken;
      return jwtToken;
   } catch (err) {
      throw new Error(err);
   }
};

const User = model("User", userSchema);

module.exports = User;
