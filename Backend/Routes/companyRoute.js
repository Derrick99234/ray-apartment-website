const express = require("express");
const authenticate = require("../Middleware/verifyJWT");
const {
  createCompany,
  getCompany,
} = require("../controllers/companyController");
const router = express.Router();

router.post("/create-page", authenticate, createCompany);
router.get("/get-company-data/:email", authenticate, getCompany);

module.exports = router;
