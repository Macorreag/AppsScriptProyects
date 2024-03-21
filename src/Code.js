function doGet() {
  
  /*Para retornar la pagina con los partials cargados*/
  return HtmlService.createTemplateFromFile("index").evaluate();

}


function userClicked(submittedForm){
  /*Link Hoja de calculo para almacenar respuestas*/
  var url = "https://docs.google.com/spreadsheets/d/1SnpBj_dqndRz8cKNdwaxRELAuI7twnZeFHTchYqcjRQ/edit#gid=0";
  
  /*Abrir la hoja de calculo*/
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  
  /*Seleccionar hoja donde almacenar los datos*/
  var sheet = spreadsheet.getSheetByName("Respuestas");
  
  
  sheet.appendRow([
    new Date(),
    submittedForm.cedula,
    submittedForm.fullName,
    submittedForm.phone,
    submittedForm.email,
    submittedForm.whatsappAuthorization,
    submittedForm.formQuery
  ]);
  

}


function include (filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();

}
