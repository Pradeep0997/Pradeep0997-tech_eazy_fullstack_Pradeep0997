// backend/controllers/deliveryOrderController.js
const { DeliveryOrder } = require("../models");
const path = require("path");
const fs = require("fs");

exports.uploadOrder = async (req, res) => {
  try {
    const file = req.files?.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filename = `${Date.now()}_${file.name}`;
    const filepath = path.join(uploadDir, filename);
    await file.mv(filepath);

    const lines = fs.readFileSync(filepath, "utf-8").split("\n").filter(Boolean);

    const vendor = req.vendor; // ✅ from auth middleware

    const newOrder = await DeliveryOrder.create({
      date: new Date().toISOString().split("T")[0],
      totalOrders: lines.length,
      fileLink: `/uploads/${filename}`,
      vendorName: vendor.name,
      vendorId: vendor.id,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await DeliveryOrder.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
