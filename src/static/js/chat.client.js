const form = document.querySelector("form");
const inputMessage = document.querySelector("input");
const ulMessages = document.querySelector("#ulMessages"); // Agregué el selector correcto para ulMessages
let currentUser;
// @ts-ignore
Swal.fire({
  title: "Welcome to the chat section. Please fill your username:",
  input: "text",
  showCancelButton: true,
  confirmButtonText: "Log in",
  allowOutsideClick: false,
}).then((result) => {
  if (result.isConfirmed) {
    currentUser = result.value;
    startChat(result.value);
    inputMessage?.focus();
  }
});

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Puedes personalizar el formato según tus preferencias
}

function startChat(user) {
  // @ts-ignore
  const socket = io({
    auth: {
      user,
    },
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = inputMessage?.value;
    if (text) {
      socket.emit("message", {
        timestamp: Date.now(),
        user,
        text,
      });
      form.reset();
    }
  });

  socket.on("newUser", (newUser) => {
    // @ts-ignore
    Swal.fire({
      text: "new user: " + newUser,
      toast: true,
      position: "top-right",
    });
  });

  socket.on("userDisconnected", (userDisconnected) => {
    // @ts-ignore
    Swal.fire({
      text: userDisconnected + " has disconnected from the chat",
      toast: true,
      position: "top-right",
    });
  });

  socket.on("messages", (messages) => {
    // @ts-ignore
    ulMessages.innerHTML = "";
    messages.forEach(({ timestamp, user, text }) => {
      const li = document.createElement("li");
      li.innerHTML = `${user}: ${text} (${formatTimestamp(timestamp)})`;
      ulMessages?.appendChild(li);
    });
  });
}
