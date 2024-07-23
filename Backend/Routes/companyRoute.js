const express = require("express");
const authenticate = require("../Middleware/verifyJWT");
const {
  createCompany,
  getCompany,
  updateCompany,
} = require("../controllers/companyController");
const router = express.Router();

router.post("/create-page", authenticate, createCompany);
router.get("/get-company-data/:email", authenticate, getCompany);
router.put("/update-company-data/:email", authenticate, updateCompany);

module.exports = router;
