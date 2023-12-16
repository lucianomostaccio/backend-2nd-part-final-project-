const express = require("express");
const router = express.Router();
const messagesModel = require("../dao/models/messagesModel.js");
const { uploader } = require("../middlewares/multer.js");

router.get("/", async (req, res) => {
  try {
    let messages = await messagesModel.find();
    res.send({ result: "success", payload: messages });
  } catch (error) {
    console.log("cannot get messages with mongoose: " + error);
  }
});

router.post("/upload", uploader.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ status: "error", error: "image uploading failed" });
  }
  console.log(req.file);
  // Tu lógica para manejar la carga de archivos
  res.send({ status: "success", message: "file uploaded successfully" });
});

module.exports = router;
