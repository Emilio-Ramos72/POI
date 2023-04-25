$(document).ready(function () {
  showteamdata();

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  function showteamdata() {
    var teamid = getQueryVariable("id");
    var nombre = document.getElementById("nombreEquipo");
    var foto = document.getElementById("imgEquipo");

    var FoDatos = new FormData();
    opc = 4;

    FoDatos.append("Team_Id", teamid);
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
          // alterar team info
          nombre.innerHTML = Jason[0]["NOMBRE"];
          foto.setAttribute("src", "../PHP/TeamPicture.php?id=" + teamid);

          //crear coneccion entre equipos e integrantes
        } else alert(Jason.result);
        //"status" => "ok",
        //"result" => array()
      });
  }
});
