const User = require("../models/user");

exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = (req, res) => {
  //   console.log("UPDATE USER - req.auth", req.auth, "UPDATE DATA", req.body);
  const { username, password } = req.body;
  User.findOne({ _id: req.auth._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!username) {
      return res.status(400).json({
        error: "Username is required",
      });
    } else {
      user.username = username;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      } else {
        updatedUser.hashed_password = undefined;
        updatedUser.salt = undefined;
        res.json(updatedUser);
      }
    });
  });
};
