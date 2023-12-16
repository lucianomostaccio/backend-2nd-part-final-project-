const express = require("express");
const router = express.Router();
const productRouter = require("./product.router.js");
const cartRouter = require("./cart.router.js");
const chatRouter = require("./chat.router.js");

const apiRouter = router;

apiRouter.use("/products", productRouter);
apiRouter.use("/carts", cartRouter);
apiRouter.use("/chat", chatRouter);

module.exports = apiRouter;
