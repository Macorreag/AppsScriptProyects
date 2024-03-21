/**
 * 
 * @param {*} e Contiene los eventos proporcionados del trigger GET de esta API Rest
 * @returns 
 */
function doGet(e) {
  return sendJSON_(e)
}

/**
 * Otra forma de usar el doPost(e)
 * 
  function doPost(e){
    return sendJSON_({hola: "mundo"})
  }
 */

const doPost = (request = {}) => {
  // Si no hace match los valores quedan en null
  // en los parameters vienen los querystring una sola no multiples
  let { parameter, postData: { contents, type } = {} } = request;
  try{
      var { action, value } = JSON.parse(contents);
    }catch(error){
      return sendJSON_({status: 500, message: `Formato incorrecto para el body, debe ser {"action" : "base64", "value" : "Hola Mundo"} Verifique e intente nuevamente.`});
  }

  if (typeof action != "string" || typeof value != "string"){
    return sendJSON_({status: 500, message: `Los campos "actión" y "value" deben ser de tipo String`});
  }
  if (action.length < 0 && value.length < 0){
    return sendJSON_({status: 500, message: `Los campos "action" y "valor" deben tener al menos un caracter`});
  }

  try{
    switch (action) {
      case "Array":
        //Conversion a array
        return sendJSON_({status: 200, result:  split_string(value), value: value, formated: JSON.stringify(split_string(value)) });
      case "base64":
        //Conversion de un String en Base64
        let base_64 = Utilities.base64Encode(value)
        return sendJSON_({status: 200, result: base_64});
      case "upper":
        // Transformacion de un texto en mayusculas
        let upperCase = value.toUpperCase();
        return sendJSON_({status: 200, result: upperCase});
      case "lower":
        // Transformacion de un texto a minusculas
        let lowerCase = value.toLowerCase();
        return sendJSON_({status: 200, result: lowerCase});
      case "capitalize":
        // Transformacion de un texto a mayuscula la primera de cada letra
        return sendJSON_({status: 200, result: capitalize(value)});
      default:
        return sendJSON_({status: 500, message: `No se tiene una función para procesar la action ${action}`});
    }
  }catch(error){
    return sendJSON_({status: 500, message: `Error al intentar ejecutar la action ${action}`});
  }
};

function capitalize(string_phrase){
  let words = string_phrase.toLowerCase().split(" ");

  for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  //Unir las palabras nuevamente
  return words.join(" ");
}


//Función que prepara los elementos para devolverlos como un JSON
function sendJSON_(jsonResponse){
  //No es posible enviar otro estado de respuesta, y siempre respondera con 200 a menos que sea un 
  // fallo interno de Google Services.
  return ContentService
  .createTextOutput(JSON.stringify(jsonResponse))
  .setMimeType(ContentService.MimeType.JSON); 
}

function split_string(text =  ""){

  //const regex = /[^@]+(@|$)/gm; 

  const regex = /(?<previous>[^@]*)(?<nickname>@[^@\s&]+)(?<name_nickname>&*[^@\s&]*)(?<end>[^@]*)/g;



  //let text = "Estoy preguntando si puedo jugar @baloncesto en @cali la bella ciudad";
  //let text = " Estoy preguntandosipuedo ";

  //let text = "@mundo Estoy pregu@ntando si puedo jugar @baloncesto en @cali la bella @ciudad";





  let matches_array = [];


  if (!text.includes('@')){
    //Texto no tiene arrobas
      return [{
        text: text,
        userDefined: true,
      }];
  } 

  while ((array1 = regex.exec(text)) !== null) {
    //console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
    let json_match_nickname = {};
    let previous = {};
    let end = {}

    Logger.log(array1.groups)

    if (array1.groups.previous == "" && array1.groups.end == ""){
      json_match_nickname = {
        userDefined: true,
        entityType: `@${array1.groups.name_nickname.substring(1)}`,
        alias: array1.groups.name_nickname.substring(1),
        text: array1.groups.nickname.substring(1),
      }
      matches_array.push(json_match_nickname);
    }else if(array1.groups.previous == ""){
      json_match_nickname = {
        userDefined: true,
        entityType: `@${array1.groups.name_nickname.substring(1)}`,
        alias: array1.groups.name_nickname.substring(1),
        text: array1.groups.nickname.substring(1),
      }
      matches_array.push(json_match_nickname);

      end = {
        text: array1.groups.end,
        userDefined: true,
      }

      matches_array.push(end);
    }else if(array1.groups.end == ""){

      previous = {
        text: array1.groups.previous,
        userDefined: true,
      }
      matches_array.push(previous);


      json_match_nickname = {
        userDefined: true,
        entityType: `@${array1.groups.name_nickname.substring(1)}`,
        alias: array1.groups.name_nickname.substring(1),
        text: array1.groups.nickname.substring(1),
      }
      matches_array.push(json_match_nickname);

    }else{
      previous = {
        text: array1.groups.previous,
        userDefined: true,
      }
      matches_array.push(previous);


      json_match_nickname = {
        userDefined: true,
        entityType: `@${array1.groups.name_nickname.substring(1)}`,
        alias: array1.groups.name_nickname.substring(1),
        text: array1.groups.nickname.substring(1),
      }
      matches_array.push(json_match_nickname);
      
      end = {
        text: array1.groups.end,
        userDefined: true,
      }

      matches_array.push(end);
    }

  }
  
  
  return matches_array;
}


function test(){
  //Logger.log(split_string("Estoy preguntando si puedo jugar @balonc&esto en @cali la bella ciudad"));
  Logger.log(split_string("Hola estoy en @Arequipa&City-DF y me gusta jugar @Tenis&Sport-DF")); 

}
