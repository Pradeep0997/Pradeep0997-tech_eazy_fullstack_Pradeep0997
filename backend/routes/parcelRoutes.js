// routes/parcelRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAllParcels,
  getParcel,
  createParcel,
  updateParcel,
  deleteParcel,
} = require("../controllers/parcelController");

router.get("/", getAllParcels);
router.get("/:trackingId", getParcel);
router.post("/", createParcel);
router.put("/:trackingId", updateParcel);
router.delete("/:trackingId", deleteParcel);

module.exports = router;
