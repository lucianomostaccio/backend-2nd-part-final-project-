const express = require("express");
const router = express.Router();
const CartManager = require("../dao/services/mongodb/CartManager");

const cartManager = new CartManager();

// Rutas para manejo de carts

// Agregar un nuevo cart
router.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.status(201).json({ message: "Cart added successfully" });
  } catch (error) {
    console.error("Error adding cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Obtener un cart por ID
router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).send("Cart not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Agregar a un cart específico un producto
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    await cartManager.addProductToCart(cartId, prodId);
    res.json({
      message: "Success. If cart exists, product has been added",
    });
  } catch (error) {
    console.error("Error adding the product in the cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
