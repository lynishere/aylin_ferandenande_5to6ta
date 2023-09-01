document.addEventListener("DOMContentLoaded", function () {
  const carritoContainer = document.getElementById("carrito");
  const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
  const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
  const totalElement = document.getElementById("total");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para mostrar los productos en el carrito con botón de eliminar
  function mostrarProductosEnCarrito() {
    let idProd = 0;
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
      carritoContainer.innerHTML =  `
      <p>El carrito está vacío</p>
      <a class="login-submit btn primary"  id="boton" href="../index.html">¡Compra algo!</a>
       `;

    } else {
      carrito.forEach((producto, index) => {
        let prodcarrito = document.createElement("div");
        if (idProd > 0) {
          idProd++;
        }
        carritoContainer.innerHTML += `
          <div class="cart-item">
            <h3 class="card-title">${producto.nombre}</h3>
            <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
            <button class="btn btn-danger btn-sm elim-prod" data-index="${index}">x</button>
          </div>
        `;
      });
    }
  }
  // Calcular y mostrar el total
  const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
  totalElement.textContent = `Total: $${total.toFixed(2)}`;

  // Mostrar u ocultar botones según el estado del carrito
  if (carrito.length === 0) {
    btnFinalizarCompra.disabled = true;
    btnVaciarCarrito.disabled = true;
  }

  // Escuchar clic en el botón "Finalizar compra"
  btnFinalizarCompra.addEventListener("click", function () {
    Swal.fire({
      icon: "question",
      title: "¿Deseas finalizar la compra?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Compra exitosa",
          text: "Gracias por tu compra. ¡Disfruta tus dulces!",
        }).then(() => {
          // Vaciar el carrito y actualizar el almacenamiento local
          localStorage.removeItem("carrito");
          carritoContainer.innerHTML = "";
          totalElement.textContent = "Total: $0.00";
          
          btnFinalizarCompra.disabled = true;
          btnVaciarCarrito.disabled = true;
        });
      } else {
        console.log("No se finalizó la compra.");
      }
    });
  });

 // Escuchar clic en el botón "Vaciar carrito"
  btnVaciarCarrito.addEventListener("click", function () {
    // Vaciar el carrito y actualizar el almacenamiento local
    localStorage.removeItem("carrito");
    carritoContainer.innerHTML = "";
    totalElement.textContent = "Total: $0.00";
    btnFinalizarCompra.disabled = true;
    btnVaciarCarrito.disabled = true;
  });
  carritoContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("elim-prod")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      const productoEliminado = carrito.splice(index, 1)[0]; // Eliminar el producto del arreglo y obtenerlo
      localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar almacenamiento local

      // Actualizar la visualización de productos en el carrito
      mostrarProductosEnCarrito();

      // Calcular y mostrar el nuevo total
      const nuevoTotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
      totalElement.textContent = `Total: $${nuevoTotal.toFixed(2)}`;

      // Mostrar o ocultar botones según el estado del carrito
      if (carrito.length === 0) {
        btnFinalizarCompra.disabled = true;
        btnVaciarCarrito.disabled = true;
      }
    }
  });
     mostrarProductosEnCarrito();
});


