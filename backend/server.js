const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const parcelRoutes = require("./routes/parcelRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const deliveryOrderRoutes = require("./routes/deliveryOrderRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/delivery-orders", deliveryOrderRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
