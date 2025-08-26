const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const roykey = process.env.roybabu;

const verifyToken = async (req, res, next) => {
 const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, roykey);
    const vendor = await Vendor.findById(decoded.vendorId);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
