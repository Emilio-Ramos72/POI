function HideUnhideSel() {
  var secc = document.getElementById("CreateTeams");
  var butt = document.getElementById("btncreate");
  if (secc.style.display === "none") {
    secc.style.display = "block";
    butt.value = " - ";
  } else {
    secc.style.display = "none";
    butt.value = " + ";
  }
}
function CreateTeam() {
  var nombre = document.getElementById("nameequipo").value;
  var imagenComprobacion = document.getElementById("teamimage").value;

  var imagen;
  var opc = 1;

  let Body = { nombre, opc };

  var FoDatos = new FormData();
  FoDatos.append("nombre", nombre);
  FoDatos.append("foto", $("#teamimage")[0].files[0]);
  FoDatos.append("opc", opc);

  fetch("../php/equipo.php", { method: "POST", body: FoDatos })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      var Jason = data;
      console.log(Jason);
      if (Jason === "success") {
        alert("Registro exitoso");
        window.location.href = "Index.html";
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });
}
