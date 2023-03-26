const { compare, hash } = require("bcryptjs");

const { sendErrorResponse } = require("../helpers");
const { User } = require("../models");
const {
   userLoginSchema,
   userSignupSchema,
} = require("../validations/user.schema");
const { isValidObjectId } = require("mongoose");
const userSignUpEmail = require("../helpers/SignupEmail");

module.exports = {
   doSignup: async (req, res) => {
      try {
         const { name, email, password } = req.body;
         console.log(req.body);

         const { _, error } = userSignupSchema.validate(req.body);

         if (error) {
            return sendErrorResponse(
               res,
               400,
               error.details ? error?.details[0]?.message : error.message
            );
         }

         const user = await User.findOne({ email });
         if (user) {
            return sendErrorResponse(res, 400, "Email already exists");
         }

         const hashedPassowrd = await hash(password, 8);

         const newUser = new User({
            name,
            email,
            role: "user",
            password: hashedPassowrd,
         });

         const jwtToken = await newUser.generateAuthToken();
         newUser.jwtToken = jwtToken;
         await newUser.save();

         userSignUpEmail(
            email,
            "User SignUp Mail",
            " You have been successfully registered new account ."
         );

         res.status(200).json({ newUser, jwtToken });
      } catch (err) {
         sendErrorResponse(res, 500, err);
      }
   },

   doLogin: async (req, res) => {
      try {
         const { email, password } = req.body;

         const { _, error } = userLoginSchema.validate(req.body);
         if (error) {
            return sendErrorResponse(
               res,
               400,
               error.details ? error?.details[0]?.message : error.message
            );
         }

         const user = await User.findOne({ email });
         if (!user) {
            return sendErrorResponse(res, 400, "Invalid Email");
         }

         const isMatch = await compare(password, user.password);
         if (!isMatch) {
            return sendErrorResponse(res, 400, "Invalid Password");
         }

         const jwtToken = await user.generateAuthToken();
         await user.save();

         res.status(200).json({ user, jwtToken });
      } catch (err) {
         sendErrorResponse(res, 500, err);
      }
   },

   getAccount: async (req, res) => {
      try {
         res.status(200).json(req.user);
      } catch (err) {
         sendErrorResponse(res, 500, err);
      }
   },

   getAllUsers: async (req, res) => {
      try {
         const users = await User.find({
            role: "user"
         });

         res.status(200).json(users);
      } catch (err) {
         sendErrorResponse(res, 500, err);
      }
   },
   
   deleteUser: async (req, res) => {
      try {
         const { id } = req.params;

         if (!isValidObjectId(id)) {
            return sendErrorResponse(res, 400, "Invalid User Id!");
         }
         await User.findByIdAndDelete(id);

         res.status(200).json({
            message: "success",
         });
      } catch (err) {
         sendErrorResponse(res, 500, err);
         console.log(err);
      }
   },
};
