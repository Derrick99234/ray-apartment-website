const express = require("express");
const { register, login, forgottenPassword, resetPassword, google } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotten-password", forgottenPassword);
router.post("/reset-password", resetPassword);
router.post("/google", google);

module.exports = router;
