const mongoose = require("mongoose");
const Joi = require("joi");
// const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(6)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(50)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = mongoose.model("User", userSchema);
module.exports.validateUser = validateUser;
