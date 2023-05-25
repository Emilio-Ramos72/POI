function llevameAInSes() {
  window.location.href = "index.html";

  borrarCookie("pass");
  borrarCookie("mail");
}
function llevamePerfil() {
  window.location.href = "perfil.html";
}
function llevameRegistrarme() {
  window.location.href = "Registro.htm";
}
function llevamePanP() {
  window.location.href = "index.html";
}
function llevameAmisCursos() {
  window.location.href = "misCursos.html";
}
//Ver Equipo, agregar ID de equipo
function llevameAverEquipos(id) {
  window.location.href = "ChatEquipo.html?id=" + id;
}
function llevameCrearCurso() {
  window.location.href = "subirCurso.html";
}
function llevameAhistorial() {
  window.location.href = "historialAl.html";
}
function llevameAVentas() {
  window.location.href = "Ventas.html";
}
function llevameAEdPerfil() {
  window.location.href = "editarPerfil.html";
}
function llevameANewCat() {
  window.location.href = "Categoria.html";
}
function llevameAEquipos() {
  window.location.href = "PantallaPrinc.html";
}

function llevameATareas() {
  window.location.href = "Tareas.html";
}
function llevameATarea(id) {
  window.location.href = "ViewTarea.html?id=" + id;
}

function borrarCookie(nombre) {
  document.cookie =
    nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
