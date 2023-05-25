let hablando_con_trampa = { id: 0, nombre: null };
let Yo_con_trampa = "";

$(document).ready(function () {
  Yo_con_trampa = getQueryVariable("id");

  //console.log("YO trampa: ", Yo_con_trampa);

  traerChats();

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
});

function traerChats() {
  let filtro = document.getElementById("membername").value;
  let secc = document.getElementById("dropcontent");
  secc.innerHTML = "";

  fetch("../php/mensajes.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    //Traer los chats disponibles
    body: JSON.stringify({ filtro, opc: 4 }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let Jason = data;
      if (Jason != "NoHayPerfiles") {
        console.log(Jason);
        let array = [];
        for (let i in Jason) {
          if (
            //para mostrar todos los chats disponibles
            Yo_con_trampa == Jason[i]["RECEPTOR_ID"] ||
            Yo_con_trampa == Jason[i]["EMISSOR_ID"]
          ) {
            if (Yo_con_trampa == Jason[i]["RECEPTOR_ID"]) {
              let imprimir = true;

              array.forEach((element) => {
                if (Jason[i]["EMISSOR_ID"] == element) {
                  imprimir = false;
                }
              });
              if (imprimir) {
                let pending = 0;
                fetch("../php/mensajes.php", {
                  method: "POST",
                  header: { "Content-Type": "application/json" },
                  //traer el numero de mensajes pendientes
                  body: JSON.stringify({
                    receptor: Jason[i]["EMISSOR_ID"],
                    opc: 5,
                  }),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data2) => {
                    let Jason2 = data2;
                    //traer la data de pending
                    console.log("contenidos json2: ", Jason2);
                    if (Jason2["status"] == "NoHayPendientes") {
                      console.log("No vienen pendientes");
                      pending = 0;
                    } else {
                      console.log(
                        "Mensajes pendientes de",
                        Jason[i]["NOMBRE_EMISOR"],
                        ": ",
                        Jason2[0]["PENDING"]
                      );
                      pending = Jason2[0]["PENDING"];
                      console.log(
                        "valor de pending adentro del ferch:",
                        pending
                      );
                    }
                    secc.innerHTML += `
                  <button class='personas' id='${
                    Jason[i]["EMISSOR_ID"]
                  }' onclick='chatSelectUser(${Jason[i]["EMISSOR_ID"]})'>${
                      Jason[i]["NOMBRE_EMISOR"]
                    }${
                      pending > 0
                        ? `<span class='pending'>${pending}</span>`
                        : ""
                    }</button>
                `;
                  });

                array.push(Jason[i]["EMISSOR_ID"]);
              }
            } else {
              let imprimir = true;

              array.forEach((element) => {
                if (Jason[i]["RECEPTOR_ID"] == element) {
                  imprimir = false;
                }
              });
              if (imprimir) {
                let pending;
                fetch("../php/mensajes.php", {
                  method: "POST",
                  header: { "Content-Type": "application/json" },
                  //traer el numero de mensajes pendientes
                  body: JSON.stringify({
                    receptor: Jason[i]["RECEPTOR_ID"],
                    opc: 5,
                  }),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data2) => {
                    let Jason2 = data2;
                    //traer la data de pending
                    console.log("contenidos json2: ", Jason2);
                    if (Jason2["status"] == "NoHayPendientes") {
                      console.log("No vienen pendientes");
                      pending = 0;
                    } else {
                      console.log(
                        "Mensajes pendientes de",
                        Jason[i]["NOMBRE_RECEPTOR"],
                        ": ",
                        Jason2[0]["PENDING"]
                      );
                      pending = Jason2[0]["PENDING"];
                      console.log(
                        "valor de pending adentro del ferch:",
                        pending
                      );
                    }
                    secc.innerHTML += `
                  <button class='personas' id='${
                    Jason[i]["RECEPTOR_ID"]
                  }' onclick='chatSelectUser(${Jason[i]["RECEPTOR_ID"]})'>${
                      Jason[i]["NOMBRE_RECEPTOR"]
                    }${
                      pending > 0
                        ? `<span class='pending'>${pending}</span>`
                        : ""
                    }</button>
                `;
                  });
                console.log("valor de pending fuera del ferch:", pending);

                array.push(Jason[i]["RECEPTOR_ID"]);
              }
            }
            console.log("contenidos array: ", array);
          }

          /*
            secc.innerHTML +=
            "<button class='personas' id='" +
            Jason[i]["RECEPTOR_ID"] +
            "' onclick='chatSelectUser(" +
            Jason[i]["RECEPTOR_ID"] +
            ")' >" +
            Jason[i]["NOMBRE_RECEPTOR"] +
            "</button>";
*/
        }
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });
}

function ChatfiltrerUsers() {
  let filtro = document.getElementById("membername").value;
  let secc = document.getElementById("dropcontent");
  secc.innerHTML = "";

  if (filtro != null) {
    let opc = 5;

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
        let Jason = data;
        if (Jason != "NoHayPerfiles") {
          alert("Registro exitoso");
          //console.log(Jason);

          for (let i in Jason) {
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
  let btnLoc = document.getElementById("btnLocalización");
  btnLoc.style.display = "inline";
  //console.log("Selected id", id);
  fetch("../php/mensajes.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    //hacer vistos los mensajes
    body: JSON.stringify({ id: id, opc: 6 }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
    });

  //let hablo = document.getElementById("habloCon");
  let secc = document.getElementById("mensajesActuales");
  secc.innerHTML = "";
  //console.log("Me han seleccionado en chat", id);
  let persona = document.getElementById(id);
  let hablando = document.getElementById("habloCon");
  let barra = document.getElementById("barraMensaje");
  barra.value = null;

  hablando.innerHTML = "";

  //buscar al usuario en caso de no tener mensajes como failsafe
  hablando_con_trampa.id = id;
  hablando_con_trampa.nombre = persona.innerHTML;
  //console.log(hablando_con_trampa.nombre);

  hablando.innerHTML = "<p>" + hablando_con_trampa.nombre + "</p>";

  //--------------

  opc = 2;
  let dataid = id;

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
      let Jason = data;
      //console.log("largo del json ",Object.keys(Jason).length);
      if (Object.keys(Jason).length > 0) {
        alert("Podemos acceder a los mensajes del usuario");
        //console.log(Jason[0]["ACTIVO"]);

        if (Jason[0]["ACTIVO"] == 0) {
          //inactivo
          hablando.innerHTML =
            "<p>" +
            hablando_con_trampa.nombre +
            "</p><p>Ultima Accion: " +
            Jason[0]["LASTTIME"] +
            "</p>";
        } else {
          //Activo
          hablando.innerHTML =
            "<p>" + hablando_con_trampa.nombre + "</p><p>Activo</p>";
        }
        //console.log(Jason);
        //console.log(id);
        for (let i in Jason) {
          if (Jason[i]["ENCRIPTACION"] == 1) {
            //desencripta el mensaje
            Jason[i]["MENSAJE"] = desencriptar(Jason[i]["MENSAJE"], 5);
          }
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

  //fetch para hacer vistos los mensajes
}

function sendMessage() {
  let mensaje = document.getElementById("barraMensaje").value;
  let secc = document.getElementById("mensajesActuales");

  let statusSlider = document.getElementById("checkbox1").checked;
  let valorSlider = 0;
  if (statusSlider) {
    mensaje = encriptar(mensaje, 5);
    valorSlider = 1;
  }

  secc.innerHTML = "";
  let barra = document.getElementById("barraMensaje");
  barra.value = null;
  //console.log(mensaje, "hablando con el id", hablando_con_trampa);

  opc = 1;
  let id = hablando_con_trampa.id;

  Body = { mensaje, id, valorSlider, opc };
  jsonBody = JSON.stringify(Body);

  //console.log(Body);
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
      let Jason = data;
      //.log(Jason);
      if (Jason != "NoSePudoCrearUnMensaje") {
        //alert("Podemos crear un nuevo mensaje");
        //CUANDO ENVIE EL MENSAJE
        for (let i in Jason) {
          //console.log(Jason[i]["RECEPTOR_ID"]);
          if (Jason[i]["ENCRIPTACION"] == 1) {
            //desencripta el mensaje
            Jason[i]["MENSAJE"] = desencriptar(Jason[i]["MENSAJE"], 5);
          }
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

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Tu navegador no soporta la geolocalización.");
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  console.log("latitud actual", latitude);
  console.log("longitud actual", longitude);
  sendLocalizacion(latitude, longitude);
  // Aquí puedes enviar la ubicación al servidor PHP utilizando AJAX
}

function sendLocalizacion(latitud, longitud) {
  let mensaje =
    "Mi localización actual es: Latitud: " + latitud + " Longitud: " + longitud;
  let secc = document.getElementById("mensajesActuales");
  secc.innerHTML = "";
  let barra = document.getElementById("barraMensaje");
  barra.value = null;
  //console.log(mensaje, "hablando con el id", hablando_con_trampa);

  let statusSlider = document.getElementById("checkbox1").checked;
  let valorSlider = 0;
  if (statusSlider) {
    mensaje = encriptar(mensaje, 5);
    valorSlider = 1;
  }

  opc = 1;
  let id = hablando_con_trampa.id;

  Body = { mensaje, id, valorSlider, opc };
  jsonBody = JSON.stringify(Body);

  //console.log(Body);
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
      let Jason = data;
      console.log(Jason);
      if (Jason != "NoSePudoCrearUnMensaje") {
        //alert("Podemos crear un nuevo mensaje");
        //CUANDO ENVIE EL MENSAJE
        for (let i in Jason) {
          //console.log(Jason[i]["RECEPTOR_ID"]);
          if (Jason[i]["ENCRIPTACION"] == 1) {
            //desencripta el mensaje
            Jason[i]["MENSAJE"] = desencriptar(Jason[i]["MENSAJE"], 5);
          }
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

function encriptar(texto, cuanto) {
  // Algoritmo de encriptación
  var resultado = "";
  for (var i = 0; i < texto.length; i++) {
    resultado += String.fromCharCode(texto.charCodeAt(i) + cuanto);
  }
  return resultado;
}

function desencriptar(textoEncriptado, cuanto) {
  var resultado = "";
  for (var i = 0; i < textoEncriptado.length; i++) {
    resultado += String.fromCharCode(textoEncriptado.charCodeAt(i) - cuanto);
  }
  return resultado;
}

function textoEncriptado() {
  let texto = encriptar("encripta esto", 5);
  console.log("texto encriptado:", texto);
  let nuevotexto = desencriptar(texto, 5);
  console.log("texto desencriptado:", nuevotexto);

  console.log("el slider esta: ", isSliderOn());
}
