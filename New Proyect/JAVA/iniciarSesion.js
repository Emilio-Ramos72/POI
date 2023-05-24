//buscar cookies al abrir la pagina
$(document).ready(function () {
  /*
    2 cookies, mail pass

    mail not pass <> null

    llamar inicar sesion
    
    
    */
  var Mail = getCookieValue("mail");
  var Pass = getCookieValue("pass");
  console.log(Mail);
  console.log(Pass);

  //iniciar sesion
  if (Mail != "") {
    console.log("cookie con contenido");

    var correo = Mail;
    var password = Pass;

    var opc = 2;
    let Body = { correo, password, opc };

    let jsonBody = JSON.stringify(Body);
    //console.log(jsonBody);
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
        console.log(Jason);
        if (Jason == "sesionEncontrada") {
          alert("bienvenido");

          window.location.href = "PantallaPrinc.html";
        } else alert("Error, revise los datos");
        //"status" => "ok",
        //"result" => array()
      });
  }

  //cookie value
  function getCookieValue(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }
});

//cookie functions
function setCookie(name, value, days) {
  var expires = "";

  // Establecer la fecha de vencimiento de la cookie
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  // Convertir value en una cadena separada por punto y coma (;)
  var valueString = Array.isArray(value) ? value.join(";") : value;

  // Establecer la cookie con el valor convertido
  document.cookie = name + "=" + valueString + expires + "; path=/";
}

//inicio de sesion
function iniciaSesion() {
  var correo = document.getElementById("Correo").value;
  var password = document.getElementById("Contraseña").value;
  var opc = 2;
  let Body = { correo, password, opc };

  let jsonBody = JSON.stringify(Body);
  //console.log(jsonBody);
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
      console.log(Jason);
      if (Jason == "sesionEncontrada") {
        alert("bienvenido");
        //crear la cookie con la info de inicio de sesion

        setCookie("mail", correo, 5);

        setCookie("pass", password, 5);

        window.location.href = "PantallaPrinc.html";
      } else alert("Error, revise los datos");
      //"status" => "ok",
      //"result" => array()
    });
}
