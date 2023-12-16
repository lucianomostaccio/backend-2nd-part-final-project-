const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/services/mongodb/ProductManager");
const productManager = new ProductManager();
const messagesManager = require("../dao/services/mongodb/MessagesManager");

const viewsRouter = router;

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", {
      titulo: "Products list",
      products,
      style: "home.css", // Nombre del archivo de estilo específico para esta página
    });
  } catch (error) {
    console.error("Error obteniendo los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {
      titulo: "Lista de productos en tiempo real",
      products,
      style: "realTimeProducts.css", // Nombre del archivo de estilo específico para esta página
    });
  } catch (error) {
    console.error("Error al renderizar productos en tiempo real:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/chat", async (req, res) => {
  try {
    const messages = await messagesManager.findAll();
    res.render("chat", {
      titulo: "Chat",
      messages,
      style: "chat.css", // Nombre del archivo de estilo específico para esta página
    });
  } catch (error) {
    console.error("Error obteniendo los mensajes:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = viewsRouter;
