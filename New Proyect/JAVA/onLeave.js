window.addEventListener("beforeunload", function (e) {
  // Execute some code here

  opc = 7;
  let Body = { opc };
  let jsonBody = JSON.stringify(Body);

  fetch("../php/usuario.php", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: jsonBody,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log("User InActive");
    });
});
