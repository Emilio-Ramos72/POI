function Registrar(form) {
  var nombre = document.getElementById("name").value;

  var nickname = document.getElementById("Nickname").value;

  var correo = document.getElementById("email").value;

  var password = document.getElementById("password").value;
  var imagenComprobacion = document.getElementById("image").value;

  var num = false;
  var carac = false;
  var arroba = false;
  var com = false;

  var opc = 1;

  let Body = { nombre, nickname, correo, password, opc };

  var FoDatos = new FormData();
  FoDatos.append("nombre", nombre);

  FoDatos.append("nickname", nickname);

  FoDatos.append("correo", correo);
  FoDatos.append("password", password);

  FoDatos.append("foto", $("#image")[0].files[0]);
  FoDatos.append("opc", opc);

  fetch("../php/usuarioimagen.php", { method: "POST", body: FoDatos })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      var Jason = data;
      console.log(Jason);
      if (Jason === "success") {
        alert("Registro exitoso");
        setCookie("mail", correo, 5);

        setCookie("pass", password, 5);

        window.location.href = "Index.html";
      } else alert(Jason.result);
      //"status" => "ok",
      //"result" => array()
    });
}
