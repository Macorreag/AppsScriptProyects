function nombre(cedula) {
  var params = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload:{ "tryDocumentType": "CC",
               "tryDocumentNumber": cedula
            },
    redirect: 'follow'
  };
  
  var response = UrlFetchApp.fetch("https://www.anyAPI.com.co/api/try", params);
  var json = JSON.parse(response.getContentText("UTF-8"));
  Logger.log(json.data.names);
}
