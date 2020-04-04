const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

router.put("/:id", (req, res, next) => {});

router.get("", (req, res, next) => {});

router.get("/:id", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

module.exports = router;
