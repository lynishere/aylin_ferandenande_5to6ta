class Producto{
    constructor (nombre,precio){
      this.nombre = nombre;
      this.precio = precio;
    }
}
const productos = ObtenerProductos(); //este es el array
const carrito = ObtCarrito();
function ObtenerProductos() {
  const ProductoGuardado = localStorage.getItem("productos");
  if (ProductoGuardado){
    return JSON.parse(ProductoGuardado);
  }else{
    const ProductosPredefinidos=[
      new Producto('Gomitas de ositos', 20),
      new Producto('Chicles sabor fresa', 10),
      new Producto('Paletas de colores', 30)
    ];
    localStorage.setItem("productos",JSON.stringify(ProductosPredefinidos))
    return ProductosPredefinidos; 
  }
} 
function ObtCarrito(){
  const GuardarCarrito= localStorage.getItem("carrito");
  if (GuardarCarrito){
    return JSON.parse(GuardarCarrito);
  }else{
    return [];
  }
}
function AlCarrito(i){ //Agregar al carrito
  const producto = productos[i];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  CarritoCargado();
}
function CarritoCargado(){
  const carritoHTML = document.getElementById("carrito");
  carritoHTML.innerHTML="";
  if (carrito.length === 0){
    carritoHTML.innerHTML= "<p> EL CARRITO SE ENCUENTRA VACIO.</p>";
  }else{
    for (let i =0; i < carrito.length; i++){
      const producto = carrito[i];
      const ProductoHTML= `<div class="card" style="width: 18rem;">
      <img src="./assets/img/defult.jpeg" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button onclick="EliminarC(${i})">Eliminar</button>
      </div> `;
      carritoHTML.innerHTML += ProductoHTML;
    }
  }
}
function AgregarProd(){
  const nombre = document.getElementById("name").value;
  const precio = document.getElementById("price").value;
  if(nombre  !== "" && precio !==""&& ! isNaN (precio)){
    const ProductoNuevo = new Producto(nombre, parseFloat(precio));
    productos.push(ProductoNuevo);
    localStorage.setItem("productos",JSON.stringify(productos));
    const ProductoHTML = `
    <div class="card" style="width: 18rem;">
    <img src="./assets/img/defult.jpeg" alt="${ProductoNuevo.nombre}">
    <h3 class="card-title">${ProductoNuevo.nombre}</h3>
    <p>Precio: $${ProductoNuevo.precio}</p>
    <button onclick="AlCarrito(${productos.indexOf(ProductoNuevo)})">Agregar al carrito</button>
  </div>`;
  document.getElementById("productos").innerHTML += ProductoHTML;
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  }
}
function EliminarC(i){
  carrito.splice(i,1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  CarritoCargado();
}
function Finalizar(){
  Swal
    .fire({
        title: "COMPRAS",
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            console.log("*se elimina la compra*");
        } else {
            console.log("*NO se elimina la compra*");
        }
    });
  carrito.length = 0;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  CarritoCargado();
}
function Vaciar(){
  carrito.length = 0;
  localStorage.removeItem("carrito");
  CarritoCargado();
}
if (carrito.length > 0) {
  document.getElementById("btnFinalizarCompra").removeAttribute("disabled");
  document.getElementById("btnVaciarCarrito").removeAttribute("disabled");
}
CarritoCargado()
