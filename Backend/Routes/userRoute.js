const express = require("express");
const { getUser } = require("../controllers/userController");
const authenticate = require("../Middleware/verifyJWT");
const router = express.Router();

router.get("/get", authenticate, getUser);

module.exports = router;
