function myFunction() {
  
   var folders = DriveApp.getRootFolder().searchFolders("title contains 'Privada'");
 while (folders.hasNext()) {
   var folder = folders.next();
   //Logger.log(folder.getFiles().hasNext());
//   var myFolder = searchFolders("title contains 'Hojas'")
  while(folder.getFolders().hasNext()){
     var file = folder.getFolders().next();
     Logger.log(file.getName());
     
   }
 }

  
  /*
   var folders = DriveApp.getFolders();
 while (folders.hasNext()) {
   var folder = folders.next();
   Logger.log(folder.getName());
 }
 /*
  var folders = DriveApp.getRootFolder().searchFolders("Privada");
  
  Logger.log(folders);
  while( folders.hasNext() != false){
    Logger.log("hi");
  }
  /*while (folder.hasNext()) {
   var find = folders.next();
   Logger.log(find.getName());
 }
  
/* (folders.hasNext()) {
    var folder = folders.next();
    if(folder.getName() == "Privada"){
      var doc = DocumentApp.create("Hoja de vida con GAS");
      doc.getBody().appendParagraph("Hoja de Vida");
      doc.getBody().appendParagraph("Miller Alexander Correa Gonzalez"); 
    }
    Logger.log(folder.getName());
  }
 
 */
  
}

