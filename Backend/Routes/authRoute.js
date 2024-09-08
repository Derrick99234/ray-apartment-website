const express = require("express");
const { register, login, forgottenPassword, resetPassword, google } = require("../controllers/authController");
const authenticate = require("../Middleware/verifyJWT");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotten-password", forgottenPassword);
router.post("/reset-password", authenticate, resetPassword);
router.post("/google", google);

module.exports = router;
