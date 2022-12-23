const User = require("../models/user");
const jwt = require("jsonwebtoken");
// sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const token = jwt.sign(
      { username, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may contain sensetive information</p>
        <p>${process.env.CLIENT_URL}</p>
        `,
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        console.log("SIGNUP EMAIL SENT", sent);
        return res.json({
          message: `Email has been sent to ${email}. Follow the instructions to activate your account`,
        });
      })
      .catch((er) => {
        console.log("SIGNUP EMAIL SENT ERROR", err);
        return res.json({
          message: err.message,
        });
      });
  });
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }

        const { username, email, password } = decoded;

        const user = new User({ username, email, password });

        user.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return res.status(401).json({
              error: "Error saving use in database. Try signup again",
            });
          }

          return res.json({
            message: "Signup success. Please signin.",
          });
        });
      }
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // Check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please sign up",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { username, email } = user;
    return res.json({
      token,
      user: { username, email },
    });
  });
};
