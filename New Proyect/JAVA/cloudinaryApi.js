

$(document).ready(function() {

    cloudinary.config({
        cloud_name: 'dsvv4ae9y',
        api_key: '873728488164676',
        api_secret: 'PhFYZSayELz10VlrFY5H5jUm_IA'
    });

    // Escucha el evento de cambio en el campo de entrada de archivo
    $('#file-input').change(function() {
      // Obtiene el archivo seleccionado
      var file = $(this)[0].files[0];
  
      // Carga la imagen a Cloudinary
      cloudinary.v2.uploader.upload(file, { upload_preset: 'tu_upload_preset' }, function(error, result) {
        if (error) {
          console.log('Error al cargar la imagen:', error);
        } else {
          // Obtiene el URL de la imagen cargada
          var imageUrl = result.secure_url;
  
          // Hace algo con el URL, como guardarlo en una base de datos
          guardarUrlEnBaseDeDatos(imageUrl);
  
          console.log('URL de la imagen cargada:', imageUrl);
        }
      });
    });
  
    // Función para guardar el URL en una base de datos (aquí debes implementar tu lógica específica)
    function guardarUrlEnBaseDeDatos(url) {
      // Aquí puedes enviar el URL a tu servidor y guardar en la base de datos
      // Implementa tu lógica específica de guardado
      // Ejemplo con jQuery AJAX:
      $.ajax({
        url: 'guardar_url.php',
        method: 'POST',
        data: { url: url },
        success: function(response) {
          console.log('URL guardado en la base de datos');
        },
        error: function(error) {
          console.log('Error al guardar el URL en la base de datos:', error);
        }
      });
    }
  });
  