const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  uploadOrder,
  getOrders,
} = require("../controllers/deliveryOrderController");

router.post("/upload", auth, uploadOrder);
router.get("/", auth, getOrders);

module.exports = router;
