const express = require("express");
const validateUser = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
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
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { error } = validateUser(req.body); // ES6 object distructuring feature
  if (error) return res.status(400).json({ error: error.details[0].message }); // 400 - bad request
  user
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: "Auth failed!",
          result: result
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed!",
          result: result
        });
      }
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        "thisisthesecretshouldbelonger",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      res.status(401).json({
        message: "Auth failed!",
        error: err
      });
    });
});

router.put("/:id", (req, res, next) => {});

router.get("", (req, res, next) => {});

router.get("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

module.exports = router;
