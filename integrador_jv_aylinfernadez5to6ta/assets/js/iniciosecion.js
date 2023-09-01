class Sesion {
  constructor(usuario, contrasena) {
      this.usuario = usuario;
      this.contrasena = contrasena;
  }
}

let listaSesiones = [];
function perfil() {
  let insertUser = document.getElementById("user-profile");
  insertUser.innerHTML = `
      <p id="user-name">Hola, Administrador</p>
      <img src="../assets/img/admi_user.png" id="user-pic">
  `;
}
function Formulario() {
  let usuario = document.getElementById("username").value;
  let contrasena = document.getElementById("password").value;
  let botonCerrar = document.getElementById("cerrar-sesion");

  if (usuario == "" || contrasena == "") {
      alert("Faltan datos");
  }

  if (usuario == "Adminpato" && contrasena == "1234") {
    Swal.fire("Bienvenido Administrador", "", "success");
      let login = new Sesion(usuario, contrasena);
      listaSesiones.push(login);
      localStorage.setItem("admin", JSON.stringify(listaSesiones));
      perfil() ;
      botonCerrar.style.display = "block";
  }
}
function CerraSesion(){
  localStorage.removeItem("admin");
  Swal.fire("Hasta luego, vuelva pronto");
}

let botonSesion = document.getElementById("btn-iniciar");
botonSesion.onclick = (e) => {
  e.preventDefault()
  Formulario();
}
let botonCerrar = document.getElementById("cerrar-sesion");
botonCerrar.onclick = (e) => {
  e.preventDefault();
  CerraSesion();
}