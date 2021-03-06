const mongoose = require('mongoose');
const { verifyTokenAndAdmin } = require('../routes/verifyToken');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  categories: { type: Array },
  size: { type: String },
  condition: { type: String },
  price: { type: Number, required: true },

},
{ timestamps: true}
);




module.exports = mongoose.model("Product", ProductSchema);