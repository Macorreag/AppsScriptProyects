/**
 * This is a copy of this Library for find similarity beteen strings
 * https://github.com/aceakash/string-similarity#readme
 * 
 * El objetivo puede ser crear un REST API que responda con el mejor match que encuentree o incluir mas algoritmos
 * 
 */

function tester(){


Logger.log( findBestMatch('POPAYAN', [
    'BoGTA',
    'PAYA',
    'POPAYÁN'
  ]));

Logger.log( findBestMatch('POPAYAN', [
    'BGTA',
    'PAYA',
    'POPAYÁN'
  ], compareTwoStringsOffTick));


  Logger.log(compareTwoStringsOffTick("POPAYAN", "POPAYÁN"))

  Logger.log(compareTwoStrings("POPAYAN", "POPAYÁN"))

}

/** Compare the string but choose the best "points" match by removing the accents. */
function compareTwoStringsOffTick(first, second){
  var stringWithTick = compareTwoStrings(first, second);
  var stringWithoutTick = compareTwoStrings(deleteTicks(first), deleteTicks(second));
  return Math.max.apply(null, [stringWithTick, stringWithoutTick]);
  
}

/**
 *  Elimina los diacríticos de un texto (ES6)
 * Elimina las tildes para hacer coincidencia mas efectiva
*/
function deleteTicks(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}




function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}
/**
 * La funcion que le pasamos en functionToCompare permite determinar el valor que corresponde a cada una de las comparaciones se le puede pasar _compareTwoStringsOffTick_ para que 
 * haga la comparación sin tener en cuenta las tildes
 * 
 * 
 */
function findBestMatch(mainString, targetStrings, functionToCompare = compareTwoStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = functionToCompare(mainString, currentTargetString)
		ratings.push({target: currentTargetString, rating: currentRating})
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex]
	
	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}

function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
}