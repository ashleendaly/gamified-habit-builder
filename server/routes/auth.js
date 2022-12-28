const express = require("express");
const router = express.Router();

// import controller
const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

// import validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/auth");
const { runValidations } = require("../validators");

router.post("/signup", userSignupValidator, runValidations, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidations, signin);
// forgot reset password
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidations,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidations,
  resetPassword
);

module.exports = router;
