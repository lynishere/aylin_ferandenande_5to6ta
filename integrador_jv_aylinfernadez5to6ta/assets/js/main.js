let productos=[]; //es el vector o array de productos
class Producto{
    constructor (nombre,precio){
      this.nombre = nombre;
      this.precio = precio;
    }
}
function AgregarProducto(evento) {
  evento.preventDefault();
  const nombre = document.getElementById("producto-nombre").value;
  const precio = document.getElementById("producto-precio").value;

  if (nombre.trim() !== "" && !isNaN(parseFloat(precio))) {
    const ProductoNuevo = new Producto(nombre, precio);
    productos.push(ProductoNuevo);
    const ListaProductos = document.getElementById("lista-productos");
    const li = document.createElement("li");
     li.innerText = `Nombre: ${ProductoNuevo.nombre}, Precio: $${ProductoNuevo.precio}`;
     ListaProductos.appendChild(li);
     document.getElementById("producto-nombre").value = "";
    document.getElementById("producto-precio").value = "";
  }else {
    alert("Ingrese valores válidos para el nombre y el precio.");
}
}
const FormularioProducto = document.getElementById("formulario-producto");
FormularioProducto.addEventListener( "submit", AgregarProducto);



