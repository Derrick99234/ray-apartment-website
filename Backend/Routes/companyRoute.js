const express = require("express");
const authenticate = require("../Middleware/verifyJWT");
const { createCompany } = require("../controllers/companyController");
const router = express.Router();

router.post("/create-page", authenticate, createCompany);

module.exports = router;
