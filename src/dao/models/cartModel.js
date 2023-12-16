const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  products: [
    {
      id: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
