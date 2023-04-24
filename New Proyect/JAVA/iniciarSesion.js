function iniciaSesion(){
    var correo = document.getElementById("Correo").value;
    var password = document.getElementById("Contraseña").value;
    var opc=2;
    let Body = {correo,password,opc}


    let jsonBody = JSON.stringify(Body)
    console.log(jsonBody);
    fetch('../php/usuario.php',{method:"POST",header:{'Content-Type':'application/json'},body:jsonBody})
    .then(response => {
        return response.text();
    })
    .then(data => {
        var Jason =data;
        console.log(Jason);
        if(Jason=="sesionEncontrada"){
            alert("bienvenido");
            window.location.href = "PantallaPrinc.html";
        }
        else
        alert("Error, revise los datos")
        //"status" => "ok",
        //"result" => array()
    })

    
}