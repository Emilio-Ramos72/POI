Tarea_trampa = 0;

$(document).ready(function () {
  Tarea_trampa = getQueryVariable("id");

  var secc = document.getElementById("Tarea");

  opc = 3;
  TareaID = Tarea_trampa;

  let Body = { opc, TareaID };
  let jsonBody = JSON.stringify(Body);

  fetch("../php/Tarea.php", {
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
      if (Jason != "fail") {
        alert("Obtenemos la info del equipo");

        //secc de test
        secc.innerHTML +=
          "<div class='Equipos'><a class='titTarea')'>" +
          Jason[0]["TITULO"] +
          "</a><p class='tarea'>" +
          Jason[0]["DESCRIPCION"] +
          "</p> </div>";

        //crear coneccion entre equipos e integrantes
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });
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
