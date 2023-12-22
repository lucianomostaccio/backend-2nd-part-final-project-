// server //
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const apiRouter = require("./routes/api.router.js");
const onConnection = require("./controllers/socket.controller.js");
// const inyectSocketServer = require("./controllers/socket.controller.js");
const mongoose = require("mongoose");
require('dotenv').config();

// initialize server
const app = express();
const port = 8080;
const server = app.listen(port, () => {
  console.log(`Server listening in port: ${port}`);
}); 

// sockets server
const websocketServer = new Server(server); 
websocketServer.on('connection', onConnection(websocketServer));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); //specify static folder
// app.use(inyectSocketServer(websocketServer))

// mongoose
const connectToDatabase = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
connectToDatabase();

// routers
app.use("/api/", apiRouter)