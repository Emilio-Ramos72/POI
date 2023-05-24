$(document).ready(function () {
  var secc = document.getElementById("Tareas");

  opc = 2;

  let Body = { opc };
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

        for (var i in Jason) {
          //falta poner la foto del equipo

          console.log(Jason[i]["COMPLETADO"]);
          if (Jason[i]["COMPLETADO"] != 0) {
            //Completado
            secc.innerHTML +=
              "<div class='Equipos'><a class='titTarea')'>" +
              Jason[i]["TITULO"] +
              "</a><span class='comp'>Completado</span> <p class='tarea'>" +
              Jason[i]["DESCRIPCION"] +
              "</p> </div>";
          } else {
            secc.innerHTML +=
              "<div class='Equipos'> <a class='titTarea' onclick='llevameATarea(" +
              Jason[i]["IDTAREA"] +
              ")'>" +
              Jason[i]["TITULO"] +
              "</a> <p class='tarea'>" +
              Jason[i]["DESCRIPCION"] +
              "</p> </div>";
          }
        }

        //crear coneccion entre equipos e integrantes
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });
});
