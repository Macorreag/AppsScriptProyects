/*aa
Inspiraded By
https://stackoverflow.com/questions/57730428/google-forms-rename-file-upload-file-to-question-submitter
*/


function onFormSubmit() {
  
  
  // Open a form by ID with our responses
  var form = FormApp.openById('1JgqljG_1zWmSHfmyrrIVIB45l1HO55Ia0C1zQ4ceVJI');
  
  // Tomar solamente las respuestas
  var formResponses = form.getResponses();
  // Seleccionamos solamente la ultima respuesta a todas las respuestas del formulario 
  var lastResponse =  formResponses[formResponses.length-1];
  // seleccionar las respuestas dadas a las preguntas en el ultimo envio
  var itemResponses = lastResponse.getItemResponses();
  
  

  // Primera respuesta con la cedula de la persona
  var cc = itemResponses[0].getResponse();  
  
  
  // Recorrer todas las respuestas que se gereraron para el formulario
  for (var i = 0; i < itemResponses.length; i++) {
    
    // Procesaremos solo las respuestas en las que se pide subir un archivo
    if (itemResponses[i].getItem().getType() == "FILE_UPLOAD") {
     
      
      // Segunda respuesta con tipo de archivo a subir 
      var fileOnSubmit = itemResponses[1].getResponse();
      
      // Titulo de la pregunta en la cual se subira el archivo
      var title = itemResponses[i].getItem().getTitle();
      
      // Tercera respuesta con id del archivo a subir
      var id = itemResponses[i].getResponse();
      
      // Seleccionar el archivo que la persona va a subir
      var file= DriveApp.getFileById(id);
      
      // Concatenar tipo de archivo con numero de identificacion
      var name = fileOnSubmit +' - '+ cc;
      
      // Cambiar el nombre del archivo que la persona sube a la plataforma.
      file.setName(name);

      
    }
    
    
}
  
}