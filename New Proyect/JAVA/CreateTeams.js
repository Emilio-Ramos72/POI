var selectedMembers = []; //add with push//all id's

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
      //console.log(Jason);
      if (Jason != "fail") {
        //alert("Equipo creado con exitoso");
        //-------
        opc = 2;

        var FoDatos2 = new FormData();
        FoDatos2.append("opc", opc);

        fetch("../php/equipo.php", { method: "POST", body: FoDatos2 })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            var Jason2 = data;
            if (Jason2 != "NOTEAM") {
              //alert("Equipo creado con exitoso");

              //crear coneccion entre equipos e integrantes
              for (var i in selectedMembers) {
                console.log(selectedMembers[i]);
                console.log("Jason2 id", Jason2[0]["ID"]);
                //------add members
                /*

                opc = 3;
                var Team_Id = Jason2[0]["ID"];
                var Usuario_Id = selectedMembers[i];
                console.log("new opc value,", opc);

                let Body = { Team_Id, Usuario_Id, opc };
                let jsonBody = JSON.stringify(Body);
                */
                var FoDatos3 = new FormData();
                opc = 3;

                FoDatos3.append("Team_Id", Jason2[0]["ID"]);
                FoDatos3.append("Usuario_Id", selectedMembers[i]);
                FoDatos3.append("opc", opc);

                fetch("../php/equipo.php", { method: "POST", body: FoDatos3 })
                  .then((response) => {
                    return response.text();
                  })
                  .then((data) => {
                    var Jason3 = data;
                    console.log(Jason3);
                    if (Jason3 != "fail") {
                      alert("Miembro agregado correctamente");
                      // Enviar al team -----

                      EquipoEsp(Jason2[0]["ID"]);

                      //crear coneccion entre equipos e integrantes
                    } else alert(Jason2.result);
                    //"status" => "ok",
                    //"result" => array()
                  });

                //-------
              }
            } else alert(Jason2.result);
            //"status" => "ok",
            //"result" => array()
          });

        //----
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });

  //for para agregar a cada miembro, y tambien al creador
}
function TeamfiltrerUsers() {
  var filtro = document.getElementById("membername").value;
  var secc = document.getElementById("findusers");
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
              "<button id='" +
              Jason[i]["ID"] +
              "' onclick='MemberSelected(" +
              Jason[i]["ID"] +
              ")'>" +
              Jason[i]["NOMBRE"] +
              "</button>";
          }
        } else alert(Jason.result);
        //"status" => "ok",
        //"result" => array()
      });
  }
}

function MemberSelected(id) {
  var secc = document.getElementById("dropcontent");
  var name = document.getElementById(id).innerHTML;
  var last = document.getElementById("lastMember");
  var btn = document.getElementById("CreateTeambtn");
  //console.log(name);
  //get numeric id and add to selected members and the dropdown with all the members
  if (selectedMembers.length != 0) {
    var contains = false;
    for (var i in selectedMembers) {
      if (id == selectedMembers[i]) {
        contains = true;
      }
    }
    if (!contains) {
      selectedMembers.push(id);
      secc.innerHTML += "<p>" + name + "</p>";
      last.innerHTML = name;
    }
    //console.log(selectedMembers);
  } else {
    selectedMembers.push(id);
    secc.innerHTML += "<p>" + name + "</p>";
    last.innerHTML = name;
    //btn.disabled = false;
    //console.log(selectedMembers);
  }
  //add to drop down
}

function EquipoEsp(id) {
  window.location.href = "ChatEquipo.html?id=" + id;
}
