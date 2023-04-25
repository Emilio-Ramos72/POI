Team_trampa = 0;
$(document).ready(function () {
  showteamdata();

  Team_trampa = getQueryVariable("id");
  var secc = document.getElementById("publications");
  secc.innerHTML = "";

  var team = Team_trampa;

  var opc = 2;
  Body = { team, opc };
  jsonBody = JSON.stringify(Body);
  console.log(Body);

  fetch("../php/Post.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: jsonBody,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var Jason = data;
      console.log(Jason);
      if (Jason != "NoSePudoVerUnPost") {
        alert("Podemos ver todos los Posts");
        for (var i in Jason) {
          secc.innerHTML +=
            "<div id='publication'><div class='box'><div id='userInfo' class='contenedorFlex'><img id='imgUsuario' src='../ImagenesaCambiar/referenciaCampoFloresProyATAH.png' alt='' /><h3>Nombre</h3><p>" +
            Jason[i]["HORA"] +
            "</p></div><hr /><div id='publicationInfo'>" +
            Jason[i]["PUBLICACION"] +
            "</div></div><div id='response' class='box'><p>response</p></div></div>";
        }
        //CUANDO ENVIE EL MENSAJE

        //-----
      } else alert(Jason.result);
    });

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
    var teamid = Team_trampa;
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
          nombre.setAttribute("id", "Team" + Jason[0]["ID"]);
          foto.setAttribute("src", "../PHP/TeamPicture.php?id=" + teamid);

          //crear coneccion entre equipos e integrantes
        } else alert(Jason.result);
        //"status" => "ok",
        //"result" => array()
      });
  }
});

function sendPost() {
  var mensaje = document.getElementById("responseInput").value;
  var secc = document.getElementById("publications");
  secc.innerHTML = "";
  var barra = document.getElementById("responseInput");
  barra.value = null;
  var team = Team_trampa;

  console.log("Team ", team);

  var opc = 1;
  Body = { mensaje, team, opc };
  jsonBody = JSON.stringify(Body);
  console.log(Body);
  fetch("../php/Post.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: jsonBody,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var Jason = data;
      console.log(Jason);
      if (Jason != "NoSePudoCrearUnPost") {
        alert("Podemos crear un nuevo Post");
        for (var i in Jason) {
          secc.innerHTML +=
            "<div id='publication'><div class='box'><div id='userInfo' class='contenedorFlex'><img id='imgUsuario' src='../ImagenesaCambiar/referenciaCampoFloresProyATAH.png' alt='' /><h3>Nombre</h3><p>" +
            Jason[i]["HORA"] +
            "</p></div><hr /><div id='publicationInfo'>" +
            Jason[i]["PUBLICACION"] +
            "</div></div><div id='response' class='box'><p>response</p></div></div>";

          /*
"<div id='publication'>
            <div class='box'>
              <div id='userInfo' class='contenedorFlex'>
                <img
                  id='imgUsuario'
                  src='../ImagenesaCambiar/referenciaCampoFloresProyATAH.png'
                  alt=''
                />
                <h3>Nombre</h3>
                <p>"+ Jason[i]["HORA"]+"</p>
              </div>
              <hr />
              <div id='publicationInfo'>"+ Jason[i]["PUBLICACION"]+"</div>
            </div>
            <div id='response' class='box'><p>response</p></div>
          </div>"


*/
        }
        //CUANDO ENVIE EL MENSAJE

        //-----
      } else alert(Jason.result);
    });

  //fetch para crear la publicacion

  //----
}
