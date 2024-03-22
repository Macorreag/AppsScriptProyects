/**MYSQL Conector with Google Sheets
 * Follow this tutorial: https://www.actiondesk.io/blog/google-sheets-script-to-automatically-retrieve-sql-data
 * 
 * 
 */

var server = '11.11.11.11';
var port = 3306;
var dbName = 'dummy';
var username = 'username';
var password = 'password';
var url = 'jdbc:mysql://'+server+':'+port+'/'+dbName;

function readData() {
 var conn = Jdbc.getConnection(url, username, password);
 var stmt = conn.createStatement();
 var results = stmt.executeQuery('SELECT * FROM dashboard_dummy');
 var metaData=results.getMetaData();
 var numCols = metaData.getColumnCount();
 var spreadsheet = SpreadsheetApp.getActive();
 var sheet = spreadsheet.getSheetByName('Sheet1');
 sheet.clearContents();
 var arr=[];

 for (var col = 0; col < numCols; col++) {
   arr.push(metaData.getColumnName(col + 1));
 }

 sheet.appendRow(arr);

while (results.next()) {
 arr=[];
 for (var col = 0; col < numCols; col++) {
   arr.push(results.getString(col + 1));
 }
 sheet.appendRow(arr);
}

results.close();
stmt.close();
sheet.autoResizeColumns(1, numCols+1);
} 