class Sesion {
  constructor(usuario, contrasena) {
      this.usuario = usuario;
      this.contrasena = contrasena;
  }
}

let listaSesiones = [];

function Formulario() {
  let usuario = document.getElementById("username").value;
  let contrasena = document.getElementById("password").value;

  if (usuario == "" || contrasena == "") {
      Swal.fire("Faltan datos");
  }

  if (usuario == "Adminpato" && contrasena == "1234") {
    Swal.fire("Bienvenido Administrador", "", "success");
      let login = new Sesion(usuario, contrasena);
      listaSesiones.push(login);
      guardar();
      localStorage.setItem("admin", JSON.stringify(listaSesiones));
  }
}
function perfil() {
  let insertUser = document.getElementById("user-profile");   
  insertUser.innerHTML = `
      <p id="user-name">Hola, Administrador</p>
      <img src="../assets/img/admi_user.png" id="user-pic">
  `;
} 
function CerraSesion(){
  Swal.fire("Hasta luego, vuelva pronto");
  Swal.fire({
    icon: "question",
    title: "¿Deseas cerrar sesion?",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Salida exitosa",
        text: "Gracias hasta luego, vuelva pronto",
      }).then(() => {     
        botonCerrar.style.display = "none"; 
        localStorage.removeItem("admin");
        recargar();
      });
    } else {
      console.log("No se finalizó la compra.");
    }
  });
}

let botonSesion = document.getElementById("btn-iniciar");
botonSesion.onclick = (e) => {
  e.preventDefault()
  
  Formulario();
}
function guardar(){
      perfil();
      let botonCerrar = document.getElementById("cerrar-sesion");
  botonCerrar.style.display = "block";
}
let botonCerrar = document.getElementById("cerrar-sesion");
botonCerrar.addEventListener("click", (e) => {
  e.preventDefault();
  CerraSesion();
});
localStorage.getItem("admin");
if(localStorage.getItem("admin")){
  guardar();
   perfil();
}
function recargar(){
  location.reload();

}
localStorage.getItem("admin");
