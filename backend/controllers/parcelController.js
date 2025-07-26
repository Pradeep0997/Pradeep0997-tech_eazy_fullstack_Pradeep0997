// controllers/parcelController.js
const { Parcel } = require("../models");

exports.getAllParcels = async (req, res) => {
  const parcels = await Parcel.findAll();
  res.json(parcels);
};

exports.getParcel = async (req, res) => {
  const parcel = await Parcel.findByPk(req.params.trackingId);
  if (!parcel) return res.status(404).json({ error: "Not found" });
  res.json(parcel);
};

exports.createParcel = async (req, res) => {
  const { trackingId, sender, receiver, status } = req.body;
  try {
    const parcel = await Parcel.create({ trackingId, sender, receiver, status });
    res.json(parcel);
  } catch (err) {
    res.status(400).json({ error: "Failed to create parcel", details: err.message });
  }
};

exports.updateParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findByPk(req.params.trackingId);
    if (!parcel) return res.status(404).json({ error: "Not found" });

    const { sender, receiver, status } = req.body;
    parcel.sender = sender;
    parcel.receiver = receiver;
    parcel.status = status;
    await parcel.save();

    res.json(parcel);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
};

exports.deleteParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findByPk(req.params.trackingId);
    if (!parcel) return res.status(404).json({ error: "Not found" });

    await parcel.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
};
