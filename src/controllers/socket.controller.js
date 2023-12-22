// @ts-nocheck
const ProductManager = require("../dao/services/mongodb/ProductManager");
const messagesManager = require("../dao/services/mongodb/MessagesManager");
const productManager = new ProductManager();

function onConnection(webSocketServer) {
  return async function (socket) {
    console.log(`New client connected: ${socket.id}`);
    // socket.broadcast.emit("newUser", socket.handshake.auth.usuario);

    // Emit messages history log when a new client connects
    const chatHistory = await messagesManager.findAll();
    socket.emit("chatHistory", chatHistory);

    // Listen to client's events
    socket.on("newProduct", async (productData) => {
      try {
        await productManager.addProduct(productData);
        const allProducts = productManager.getProducts();
        webSocketServer.emit("updateProductList", allProducts);
      } catch (error) {
        console.error("Error adding the product in real time:", error);
      }
    });

    socket.on("deleteProduct", async (productId) => {
      try {
        await productManager.deleteProduct(productId);
        const allProducts = productManager.getProducts();
        webSocketServer.emit("updateProductList", allProducts);
      } catch (error) {
        console.error("Error deleting the product in real time:", error);
      }
    });

    socket.on("newMessage", async (messageData) => {
      try {
        const newMessage = await messagesManager.create(messageData);
        webSocketServer.emit("newMessage", newMessage);
      } catch (error) {
        console.error("Error adding the message in real time:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} has disconnected from the server`);
    });
  };
}

module.exports = onConnection;
