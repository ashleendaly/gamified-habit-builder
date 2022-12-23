const express = require("express");
const router = express.Router();

// import controller
const { signup, accountActivation, signin } = require("../controllers/auth");

// import validators
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidations } = require("../validators");

router.post("/signup", userSignupValidator, runValidations, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidations, signin);

module.exports = router;
