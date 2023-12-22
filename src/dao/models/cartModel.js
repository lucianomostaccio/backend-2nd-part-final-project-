const mongoose = require("mongoose");
const randomUUID = require("node:crypto");

const cartSchema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  products: [
    {
      _id: { type: String, default: randomUUID },
      quantity: { type: Number, required: true },
    },
  ],
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
