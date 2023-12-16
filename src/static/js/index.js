// @ts-nocheck
const socket = io();

function agregarProducto() {
  const title = document.querySelector("#title").value;
  if (!title) {
    alert("Please, fill in all fields");
  } else {
    // emit *add new product* to server
    socket.emit("newProduct", { title });
  }
}

function eliminarProducto(id) {
  // emit *delete product* to server
  socket.emit("deleteProduct", id);
}

socket.on("updateProductList", (updatedProducts) => {
  // Update products list in Real Time Products view
  const productListRealTime = document.querySelector(".productListRealTime");
  productListRealTime.innerHTML = "";
  updatedProducts.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = product.title;
    productListRealTime.appendChild(li);
  });
});
