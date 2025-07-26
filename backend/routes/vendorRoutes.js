// backend/routes/vendorRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getVendors } = require("../controllers/vendorController");

router.get("/", auth, getVendors); // ✅ Protected route with JWT

module.exports = router;
