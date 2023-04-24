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
function filtrerUsers() {
  var filtro = document.getElementById("membername").value;
  var secc = document.getElementById("dropcontent");

  if (filtro != null) {
    var opc = 5;

    let Body = { filtro, opc };
    let jsonBody = JSON.stringify(Body);

    fetch("../php/usuario.php", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: jsonBody,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        var Jason = data;
        if (Jason != "NoHayPerfiles") {
          alert("Registro exitoso");
          //console.log(Jason);
          console.log(Jason[1]["NOMBRE"]);
          console.log(data[0]["NOMBRE"]);
          secc.append("<p'>" + Jason[0]["NOMBRE"] + "</p>");

          for (var i in Jason) {
            secc.append("<p'>" + Jason[i]["NOMBRE"] + "</p>");
          }
        } else alert(Jason.result);
        //"status" => "ok",
        //"result" => array()
      });
  }
}
