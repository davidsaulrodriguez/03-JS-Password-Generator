// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//////////////////////////////////////////////////////

// Get a random lowercase letter from the alphabet. 
function genRandLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Get a random uppercase letter from the alphabet.
function genRandUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Get a random number from 1 to 10.
function genRandNum() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Get a random symbol from a list of OWASP approved password special characters.
function genRandSymbol() {
  const symbols = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  return symbols[Math.floor(Math.random() * symbols.length)];
}