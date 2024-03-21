/**
 * Esta aplicación es una interfaz Web para utilizar la libreria de SECOP_Lib
 * 
 */


function doGet() {
  
  var tmp = HtmlService.createTemplateFromFile("map");

  

  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}


function userClicked(cedula){
  
  return( SECOP_Lib.dataContratos(cedula) );
  
}