/**
 * Esta aplicación es una interfaz Web para utilizar la libreria de SECOP_Lib
 * 
 */


function doGet() {
  
  var tmp = HtmlService.createTemplateFromFile("index");
  
//return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)

  return tmp.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
  .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');

}



function submitForm(submittedForm){
  /*Link Hoja de calculo para almacenar respuestas*/
  var url = "https://docs.google.com/spreadsheets/d/1PGVnik6n3HY4sgbozKhmX4UL3LaFkI4qJ9B30pxr8yM/edit#gid=0";
  
  /*Abrir la hoja de calculo*/
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  
  /*Seleccionar hoja donde almacenar los datos*/
  var sheet = spreadsheet.getSheetByName("Robos");
  
  console.log(`value1: ${submittedForm.latitude}`)
  
  sheet.appendRow([
    new Date(),
    submittedForm.cedula,
    submittedForm.descriptionRobbery,
    submittedForm.robberyDate,
    submittedForm.robberyTime,
    submittedForm.latitude,
    submittedForm.longitude,
    submittedForm.mobilityThieves,
    submittedForm.bicycleBrands,
    submittedForm.colorBike
  ]);
  

}
