var hablando_con_trampa = { id: 0, nombre: null };

function ChatfiltrerUsers() {
  var filtro = document.getElementById("membername").value;
  var secc = document.getElementById("dropcontent");
  secc.innerHTML = "";

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
        return response.json();
      })
      .then((data) => {
        var Jason = data;
        if (Jason != "NoHayPerfiles") {
          alert("Registro exitoso");
          //console.log(Jason);

          for (var i in Jason) {
            //console.log(Jason[i]["NOMBRE"]);

            secc.innerHTML +=
              "<button class='personas' id='" +
              Jason[i]["ID"] +
              "' onclick='chatSelectUser(" +
              Jason[i]["ID"] +
              ")' >" +
              Jason[i]["NOMBRE"] +
              "</button>";
          }
        } else alert(Jason.result);
        //"status" => "ok",
        //"result" => array()
      });
  }
}

function chatSelectUser(id) {
  //var hablo = document.getElementById("habloCon");
  var secc = document.getElementById("mensajesActuales");
  secc.innerHTML = "";
  //console.log("Me han seleccionado en chat", id);
  var persona = document.getElementById(id);
  var hablando = document.getElementById("habloCon");
  var barra = document.getElementById("barraMensaje");
  barra.value = null;

  hablando.innerHTML = "";

  //buscar al usuario en caso de no tener mensajes como failsafe
  hablando_con_trampa.id = id;
  hablando_con_trampa.nombre = persona.innerHTML;
  //console.log(hablando_con_trampa.nombre);

  hablando.innerHTML = "<p>" + hablando_con_trampa.nombre + "</p>";

  //--------------

  opc = 2;
  var dataid = id;

  Body = { dataid, opc };
  jsonBody = JSON.stringify(Body);

  fetch("../php/mensajes.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: jsonBody,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var Jason = data;
      //console.log(Jason);
      if (Jason != "NoHayMensajes") {
        alert("Podemos acceder a los mensajes del usuario");
        //console.log(Jason);
        //console.log(id);
        for (var i in Jason) {
          //console.log(Jason[i]["RECEPTOR_ID"]);

          if (Jason[i]["RECEPTOR_ID"] == id) {
            secc.innerHTML +=
              "<div class='conMenP2'><div id='mensajesP1'>" +
              Jason[i]["MENSAJE"] +
              " <br />" +
              Jason[i]["HORA"] +
              "</div></div>";
          } else {
            secc.innerHTML +=
              "<div class='conMenP1'><div id='mensajesP2'>" +
              Jason[i]["MENSAJE"] +
              " <br />" +
              Jason[i]["HORA"] +
              "</div></div>";
          }
        }

        /*
          <div id="mensajesP1">
                  Mensaje 1 <br />
                  Hola ¿Cómo estás?
                </div>
          */
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });
}

function sendMessage() {
  var mensaje = document.getElementById("barraMensaje").value;
  var secc = document.getElementById("mensajesActuales");
  secc.innerHTML = "";
  var barra = document.getElementById("barraMensaje");
  barra.value = null;
  //console.log(mensaje, "hablando con el id", hablando_con_trampa);

  opc = 1;
  var id = hablando_con_trampa.id;

  Body = { mensaje, id, opc };
  jsonBody = JSON.stringify(Body);

  //fetch para crear mensaje

  fetch("../php/mensajes.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: jsonBody,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var Jason = data;
      //console.log(Jason);
      if (Jason != "NoSePudoCrearUnMensaje") {
        alert("Podemos crear un nuevo mensaje");
        //CUANDO ENVIE EL MENSAJE
        for (var i in Jason) {
          //console.log(Jason[i]["RECEPTOR_ID"]);

          if (Jason[i]["RECEPTOR_ID"] == id) {
            secc.innerHTML +=
              "<div class='conMenP2'><div id='mensajesP1'>" +
              Jason[i]["MENSAJE"] +
              " <br />" +
              Jason[i]["HORA"] +
              "</div></div>";
          } else {
            secc.innerHTML +=
              "<div class='conMenP1'><div id='mensajesP2'>" +
              Jason[i]["MENSAJE"] +
              " <br />" +
              Jason[i]["HORA"] +
              "</div></div>";
          }
        }

        //-----
      } else alert(Jason.result);
    });
}
