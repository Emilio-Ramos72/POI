$(document).ready(function () {
  var secc = document.getElementById("ShowTeams");

  var FoDatos = new FormData();
  opc = 5;
  FoDatos.append("opc", opc);

  fetch("../php/equipo.php", { method: "POST", body: FoDatos })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var Jason = data;
      console.log(Jason);
      if (Jason != "fail") {
        alert("Obtenemos la info del equipo");

        for (var i in Jason) {
          console.log(Jason[i]["IDEQUIPO"]);
          //falta poner la foto del equipo
          secc.innerHTML +=
            "<div class='Equipos'><img src=''alt='fotoCurso' height='130' width='215'/><br /><a class='titEquipos' onclick='llevameAverEquipos(" +
            Jason[i]["IDEQUIPO"] +
            ")'>" +
            Jason[i]["NOMBRE"] +
            "</a></div>";
        }

        //crear coneccion entre equipos e integrantes
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });
});
