const mongoose = require("mongoose");
const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: () => new Date().toLocaleString() },
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

// {user:correoDelUsuario,
// message: mensaje del usuario}

const message = mongoose.model("message", messagesSchema);

module.exports = message;
