const validateUser = require("../models/user");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  const { error } = validateUser(req.body); // ES6 object distructuring feature
  if (error) return res.status(400).json({ error: error.details[0].message }); // 400 - bad request

  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        return res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        return res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
};

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  const { error } = validateUser(req.body); // ES6 object distructuring feature
  if (error) return res.status(400).json({ error: error.details[0].message }); // 400 - bad request

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Invalid email!",
          result: result
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Passwprd Incorret!",
          result: result
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "thisisthesecretshouldbelonger",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
        error: err
      });
    });
};
