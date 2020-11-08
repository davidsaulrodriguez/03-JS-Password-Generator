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

  const hasUpper  = upper.checked;
  const hasLower  = lower.checked;
  const hasNumber = num.checked;
  const hasSymbol = sym.checked;

  passwd.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

/**
 * generatePassword - will dynamically generate a new password using the `randomizer` object.
 * @param {string} upper - takes an uppercase character
 * @param {string} lower - takes a lowercase character
 * @param {string} number - takes a number from 0-9
 * @param {string} symbol - takes a special symbol such as: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~
 * @param {number} length - the user selected length of a password from 8 to 128 characters (defaults to 8 min, max is 128).
 */
function generatePassword(upper, lower, number, symbol, length) {
  /* Steps that might work...
  * 1. Initialize the password variable
  * 2. Filter out non-selected settings
  * 3. Loop over the password length and call a generator function for each type
  * 4. Add generated password to the initialize password variable and return its value.
  */

  // 1. Init passwd var
  let generatedPassword = '';

  // 2. count the total of selected settings (this will be used to check if a password needs to be generated)
  const selectedCount = upper + lower + symbol + number;
  
  // create an array of objects from selected settings and filter out non-selected items
  // this makes use of the `randomizer` object created earlier.
  const selectedArr = [{lower}, {upper}, {number}, {symbol}].filter(
    setting => Object.values(setting)[0]
  );

  // If there isn't at least 1 setting checked, do not generate a password.
  if (selectedCount === 0) {
    console.warn("WARN 04: You need to select at least one option of: uppercase, lowercase, numeric or special symbols");
    return 'Please select at least 1 option: Uppercase, lowercase, numeric or special characters and click generate again.';
  }

  // 3. Loop over the password length and call a generator function for each type

  // If i < [password] length, increment i by the number of selected setting options.
  for (let i = 0; i < length; i += selectedCount) {
    // Call the generator function for each selected setting.
    selectedArr.forEach(type => {
      const looperFunction = Object.keys(type)[0];

      // 4. Add generated password to the initialize password variable and return its value.

      generatedPassword += randomizer[looperFunction]();
    });
  }

  const thePassword = (generatedPassword.slice(0, length));

  return thePassword;
}

/* == Generate Random uppercase, lowercase, numeric and special symbols == */

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

//===========================//
// BONUS - Copy to clipboard //
//===========================//

/**
 * copyToClipboard
 * TODO: Create copy to clipboard function.
 */