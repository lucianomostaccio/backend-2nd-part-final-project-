const express = require("express");
const router = express.Router();
const productRouter = require("./product.router.js");
const cartRouter = require("./cart.router.js");


const apiRouter = router;

apiRouter.use("/products", productRouter);
apiRouter.use("/carts", cartRouter);

module.exports = apiRouter;
