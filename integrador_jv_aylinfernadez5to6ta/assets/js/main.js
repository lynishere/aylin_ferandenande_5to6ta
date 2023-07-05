class Producto{
    constructor (nombre,precio){
      this.nombre = nombre;
      this.precio = precio;
    }
}
const productos = ObtenerProductos(); //este es el array
function ObtenerProductos() {
  const ProductoGuardado = localStorage.getItem("productos");
  if (ProductoGuardado){
    return JSON.parse(ProductoGuardado);
  }else{
    const ProductosPredefinidos=[
      new Producto('Dos corazones', 20),
      new Producto('Chicles sabor manzana', 10),
      new Producto('Paletas de colores', 30)
    ];
    localStorage.setItem("productos",JSON.stringify(ProductosPredefinidos))
    return ProductosPredefinidos; 
  }
}
function AgregarProd(){
  const nombre = document.getElementById("name").value;
  const precio = document.getElementById("price").value;
  if(nombre  !== "" && precio !==""&& ! isNaN (precio)){
    const ProductoNuevo = new Producto(nombre, parseFloat(precio));
    productos.push(ProductoNuevo);
    localStorage.setItem("productos",JSON.stringify(productos));
    const ProductoHTML = `<div class="card" style="width: 18rem;">
    <img src="./assets/img/defult.jpeg" alt="Imagen del producto">
    <h3 class="card-title">${ProductoNuevo.nombre}</h3>
    <p>Precio: $${ProductoNuevo.precio}</p>
    <button onclick="AlCarrito(${productos.indexOf(ProductoNuevo)})">Agregar al carrito</button>
  </div>`;
  document.getElementById('productos').innerHTML += ProductoHTML;
  document.getElementById('name').value = "";
  document.getElementById("price").value = "";
  };
}
function AlCarrito(i){
console.log('Producto agregado al carrito:', productos[i]);
}
