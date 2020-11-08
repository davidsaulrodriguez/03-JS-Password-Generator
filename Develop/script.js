// Capture HTML DOM Elements.
const passwd  = document.getElementById('password');
const len     = document.getElementById('length');
const upper   = document.getElementById('uppercase');
const lower   = document.getElementById('lowercase');
const num     = document.getElementById('numbers');
const sym     = document.getElementById('symbols');
const gen     = document.getElementById('generate');
const copy    = document.getElementById('clipboard');


// Put generator functions into an object for use later
const randomizer = {
  'lower': genRandLower,
  'upper': genRandUpper,
  'symbol': genRandSymbol,
  'number': genRandNum
};


// Generate the event listener (wait for the user to click the generate button)
gen.addEventListener('click', () => {
  // use a Unary plus operator to convert length from a String to a Number
  let length = +len.value;
  // Sanitize input and set absolute default of 8 characters
  // Do this only is length is `null` or less than 8.
  if (length === 0) {
    length = 8;
    console.warn("WARN 01: A default of 8 characters was chosen because you either forgot to input a password length.");
  } else if (length < 8) {
    length = 8;
    console.warn("WARN 02: A default of 8 characters was chosen because the password length you selected was few than 8 characters.");
  } else if (length > 128) {
    length = 128;
    console.warn("WARN 03: A default max of 128 characters was chosen because the password length you selected exceeds 128 characters.");
  }
  console.log(length);
});

/* == Get Random uppercase, lowercase, numeric and special symbols == */

// Get a random lowercase letter from the alphabet. 
function genRandLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Get a random uppercase letter from the alphabet.
function genRandUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Get a random number from 0 to 9.
function genRandNum() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Get a random symbol from a list of OWASP approved password special characters.
function genRandSymbol() {
  const symbols = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  return symbols[Math.floor(Math.random() * symbols.length)];
}