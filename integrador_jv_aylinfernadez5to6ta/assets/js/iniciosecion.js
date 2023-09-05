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
let insertUser = document.getElementById("user-profile");
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
            <img src="../assets/img/carga_user.png" id="user-pic">
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
  e.preventDefault();
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
}else{
  usuario();
}
function recargar(){
  location.reload();

}
localStorage.getItem("admin");
