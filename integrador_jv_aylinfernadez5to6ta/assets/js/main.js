class Producto {
  constructor(nombre, precio, id, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.imagen = imagen;
  }
}

let productos = []; // array
function verificacion() {
  if (!localStorage.getItem("productos")) {
    productos = [
      {
        nombre: " CAJA DE GOMITAS DE OSITOS ",
        precio: 1000,
        id: 1,
        imagen:
          "https://m.media-amazon.com/images/I/41r2PIMB44L._SX300_SY300_QL70_FMwebp_.jpg",
      },
      {
        nombre: " CAJA DE CHICLES CON SABOR A FRESA",
        precio: 2500,
        id: 2,
        imagen:
          "https://m.media-amazon.com/images/I/61Gul7jX68L._AC_SX679_.jpg",
      },
      {
        nombre: "CAJA DE PALETAS DE COLORES",
        precio: 2000,
        id: 3,
        imagen:
          "https://m.media-amazon.com/images/I/81DyTdNyaBL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      },
      {
        nombre: "ALFAFORES RELLENOS DE DULCE DE LECHE",
        precio: 100,
        id: 4,
        imagen:
          "https://i.pinimg.com/236x/83/26/ae/8326ae5a31495b68b2a88f3a80efb3a6.jpg",
      },
    ];
    localStorage.setItem("productos", JSON.stringify(productos));
  } else {
    productos = JSON.parse(localStorage.getItem("productos"));
  }

};

  const formularioProducto = document.getElementById("formulario-producto");
  const contenedorProductos = document.getElementById("productos");
  formularioProducto.addEventListener("submit", function (event) {
    event.preventDefault();
    // Recopilar datos de los campos del formulario
    let nombre = document.getElementById("nombre").value;
    nombre = nombre.toUpperCase();
    const precio = parseFloat(document.getElementById("precio").value);
    const imagen = document.getElementById("imagen").value;
  
    // Crear un nuevo objeto de producto
    const nuevoProducto = new Producto(nombre, precio, productos.length + 1, imagen);
    // Agregar el nuevo producto al arreglo
    productos.push(nuevoProducto);
     // Actualizar el almacenamiento local
     localStorage.setItem("productos", JSON.stringify(productos));
     // muestra el nuevo producto en la tienda
     contenedorProductos.innerHTML += `
      <div class="card">
       <img src="${nuevoProducto.imagen}"   class="card-img-top" alt="${nuevoProducto.nombre}">
       <div class="card-body" id="card-body">
       <h5 class="card-title">${nuevoProducto.nombre}</h5>
       <p class="card-text">Precio: $${nuevoProducto.precio.toFixed(2)}</p>
       <button class="btn btn-primary agregar-carrito" data-producto-id="${nuevoProducto.id}">Agregar al carrito</button>
       </div> 
       </div>
   `;
       // Limpiar los campos del formulario
       document.getElementById("nombre").value = "";
       document.getElementById("precio").value = "";
       document.getElementById("imagen").value = "";
     
       // SweetAlert que mostrar un mensaje de éxito
       Swal.fire("Producto creado correctamente. :)");
  });
  
// Función para mostrar los productos en la tienda
function mostrarProductosEnTienda() {
  const productosContainer = document.getElementById("productos");
  productos.forEach((producto) => {
    productosContainer.innerHTML += `
    <div class="card">
    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
      <button class="btn btn-primary agregar-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
    </div>
  </div>
    `;
  });
}
// Cargar productos al inicio de la página
verificacion();

// Mostrar los productos en la tienda
mostrarProductosEnTienda();

// Escuchar clics en los botones "Agregar al carrito"
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("agregar-carrito")) {
    const productoId = parseInt(event.target.getAttribute("data-producto-id"));
    const productoSeleccionado = productos.find(producto => producto.id === productoId);

    // Agregar producto al carrito en el almacenamiento local
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(productoSeleccionado);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Mostrar una alerta de éxito
    Swal.fire("Producto agregado al carrito.", "", "success");
  }
});
function usuario(){
  if (sessionStorage.getItem("nombreUser") != null) {
    crearUsuario();
  } else {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((resultado) => {
        // manda perfil a sessionStorage
        let apiNombre = resultado.results[0].name.first;
        let apiApellido = resultado.results[0].name.last;
        let apiFoto = resultado.results[0].picture.medium;
        sessionStorage.setItem("nombreUser", JSON.stringify(apiNombre));
        sessionStorage.setItem("apellidoUser", JSON.stringify(apiApellido));
        sessionStorage.setItem("fotoUser", JSON.stringify(apiFoto));
        // generar html con API
        insertUser.innerHTML = `
                <p id="user-name">Hola, ${apiNombre} ${apiApellido}</p>
                <img src="${apiFoto}" id="user-pic">
                `;
      })
      .catch(
        (error) => console.log(error),
        (insertUser.innerHTML = `
            <p id="user-name">Cargando usuario...</p>
            <img src="./assets/img/carga_user.png" id="user-pic">
            `)
      );
  }
}
const crearUsuario = () => {

  let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
  let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
  let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
  insertUser.innerHTML = `
              <p id="user-name">Hola, ${nombreUser} ${apellidoUser}</p>
              <img src="${fotoUser}" id="user-pic">
              `;
};
const formulario = document.querySelector(".formulario_prod");
let insertUser = document.getElementById("user-profile"); 
function perfil() {
  let insertUser = document.getElementById("user-profile");   
  insertUser.innerHTML = `
      <p id="user-name">Hola, Administrador</p>
      <img src="./assets/img/admi_user.png" id="user-pic">
  `;
  
} 
if(!localStorage.getItem("admin")){
    formulario.style.display = "none";
    insertUser.innerHTML="";
    usuario();
} else {
  formulario.style.display = "block";
  perfil();
  
}

