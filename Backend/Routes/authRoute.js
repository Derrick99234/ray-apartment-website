const express = require("express");
const { register, login, forgottenPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotten-password", forgottenPassword);

module.exports = router;
