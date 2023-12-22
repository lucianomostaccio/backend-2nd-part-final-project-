const mongoose = require("mongoose");
const randomUUID = require("node:crypto");
// const productsCollection = "products";

const productsSchema = new mongoose.Schema(
  {
    // Mongoose assigns ids automatically
    // id: { type: Number},
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String },
    price: { type: Number },
    status: { type: Boolean, default: true },
    stock: { type: Number },
    category: { type: String },
    thumbnails: [{ type: String }], //array of picture paths
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

const product = mongoose.model("product", productsSchema);

module.exports = product;
