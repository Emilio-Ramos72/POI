export function setCookie(name, value, days) {
  var expires = "";

  // Establecer la fecha de vencimiento de la cookie
  if (days) {
    var date = new Date();
    //date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    date.setTime(date.getTime() + days * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  // Establecer la cookie con múltiples valores separados por un punto y coma (;)
  document.cookie = name + "=" + value.join(";") + expires + "; path=/";
}

// Ejemplo de uso

/*

  var cookieValues = ["valor1", "valor2", "valor3"];

  setCookie("miCookie", cookieValues, 7);

*/

export function getCookieValue(cookieName) {
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

// Ejemplo de uso
/*
  
  var cookieValue = getCookieValue("nombreDeTuCookie");
  console.log(cookieValue);
  
  */

export function borrarCookie(nombre) {
  document.cookie =
    nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
