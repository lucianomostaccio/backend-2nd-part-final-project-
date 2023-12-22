const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/services/ProductManager");
const productManager = new ProductManager();
const CartManager = require("../dao/services/CartManager");
const cartManager = new CartManager();

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

// Vista para visualizar todos los productos con paginación
router.get("/products", async (req, res) => {
    try {
      // Obtener parámetros de paginación de la solicitud (limit, page, sort, query)
      const { limit = 10, page = 1, sort, query } = req.query;
      
      // Construir opciones de paginación
      const options = {
        limit: Number(limit),
        page: Number(page),
      };
  
      // Construir objeto de búsqueda según el query
      const searchQuery = query ? { category: query } : {};
  
      // Obtener productos paginados
      const result = await productManager.getProducts(options, searchQuery, sort);
  
      // Renderizar la vista con los productos paginados
      res.render("products", {
        titulo: "Productos",
        products: result.payload,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
        style: "products.css", // Nombre del archivo de estilo específico para esta página
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).send("Error interno del servidor");
    }
  });
  
  // Vista para visualizar un carrito específico
  router.get("/carts/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
  
      // Obtener el carrito con productos completos usando populate
      const populatedCart = await cartManager.getPopulatedCart(cartId);
  
      // Renderizar la vista con los productos del carrito
      res.render("cart", {
        titulo: `Carrito ${cartId}`,
        // @ts-ignore
        products: populatedCart.products,
        style: "cart.css", // Nombre del archivo de estilo específico para esta página
      });
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

module.exports = viewsRouter;
