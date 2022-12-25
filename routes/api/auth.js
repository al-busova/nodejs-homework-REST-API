const express = require("express");
const router = express.Router();
const {
register, login
} = require("../../controllers/auth");
const { validationUsers} = require("../../middlewares");

router.post("/register", validationUsers.registerValidation, register);
router.post("/login", validationUsers.loginValidation, login);

module.exports = router;