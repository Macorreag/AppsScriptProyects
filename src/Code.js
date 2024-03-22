function onOpen(){
  let ui = SpreadsheetApp.getUi();

  ui.createMenu('Files Controller')
    .addItem('Log Files 🗄️', 'log_files')
    .addToUi();

}



function log_files(){
  let folder = DriveApp.getFolderById('16LNHdsK4DNun2DYYJGCZk0CTyoBurQ4K');

  let files = folder.getFiles();
  let file = null;

  let sh = SpreadsheetApp.getActiveSheet();
  
  /*[
    [1, 2, 3], #file 1
    [4, 5, 6], #file 2
  ]*/
  let list = [];
  //[1,2,3]
  while(files.hasNext()){

    file = files.next();
    list.push([file.getName(), file.getUrl(), file.getDateCreated()])

  }

  sh.getRange(2, 1, list.length, list[0].length).setValues(list);

}