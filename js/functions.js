//Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза, которые одинаково читаются и слева направо
//и справа налево.

const isPalindrom = (str) => {
const lowerCaseStrNoGap = str.toLowerCase().replaceAll(' ','');
const middleLenght= Math.floor(lowerCaseStrNoGap.length/2);

for (let i=0; i<middleLenght; i++) {
  const leftLetter = lowerCaseStrNoGap[i];
  const rightLetter=lowerCaseStrNoGap[lowerCaseStrNoGap.length-(i+1)];

if (leftLetter!==rightLetter) {
return false
}
}
return true
}
isPalindrom('Лёша на полке клопа нашёл ')


/*Функция, которая принимает строку,
извлекает содержащиеся в ней цифры от 0 до 9 и
 возвращает их в виде целого положительного числа.
 Если в строке нет ни одной цифры, функция должна вернуть NaN */

 const getNumber = (string) => {
let result='';
for (let i = 0; i<string.length; i++) {
const charToCheck = string[i];
const number = parseInt(charToCheck, 10);
if (!isNaN(number)){
  result+=number
}
}
return result===''? NaN :  Number(result)
}

getNumber('батона 007')


/*Функция, которая принимает три параметра:
 исходную строку, минимальную длину и строку с добавочными символами —
и возвращает исходную строку, дополненную указанными символами до заданной длины */

const getString = (startString, minLength, additionalString) => {
  let result = additionalString + startString;

  // Добавочный символ использован один раз

if(result.length===minLength){
  return result;
}
// Добавочный символ использован три раза

if (result.length < minLength && additionalString.length===1){
for(let i=0; i<(minLength-result.length); i){
  result=additionalString[i] + result;

}
return result;
}
// Добавочные символы обрезаны с конца

if (result.length>minLength){
  // Рассчитаем какой длины должен быть добавочный элемент
let cuttedAdditionalStringLength = minLength-startString.length;

// получим уже обрезанный добавочный элемент с учетом нужной длины
let cuttedAdditionalString = additionalString.slice(0,cuttedAdditionalStringLength);
let newResult = cuttedAdditionalString + startString;
return newResult;
}
// Добавочные символы использованы полтора раза
if (result.length<minLength) {
  //Рассчитаем сколько длины еще нужно до заданной длины - minLength
  let additionalLength = minLength - result.length;
  // Рассчитаем сколько полных раз мы можем прибавить добавочный элемент - additionalString
  let iterrationCount = Math.floor(additionalLength/additionalString.length);
for (let i = 0; i < iterrationCount; i++){
  result=additionalString+result;
}
// Рассчитаем оставшуюся длину additionalString  которую надо добавить в конце
let lastAdditonalStringLenght = additionalLength - iterrationCount*additionalString.length;

// Получаем последнюю строку, которую надо прибавить
let lastAdditonalString = additionalString.slice(0,lastAdditonalStringLenght);
return lastAdditonalString+result;
}

}
getString('q', 4, 'we')

// Функция для проверки длины строки.

const checkStringLength = (stringNew, maxStringLength) => {
return (stringNew.length<=maxStringLength)? true : false;

}
checkStringLength('проверяемая строка', 10)
