import * as generatePassword from 'password-generator';
import { resolve } from 'path';

interface generatePasswordOptions {
  maxLength?: number;
  minLength?: number;
  uppercaseMinCount?: number;
  lowercaseMinCount?: number;
  numberMinCount?: number;
  specialMinCount?: number;
}

export default (
  options: generatePasswordOptions = {
    maxLength: 18, //18
    minLength: 12, //12
    uppercaseMinCount: 3,
    lowercaseMinCount: 3,
    numberMinCount: 2,
    specialMinCount: 2,
  },
) => {
  const UPPERCASE_RE = /([A-Z])/g;
  const LOWERCASE_RE = /([a-z])/g;
  const NUMBER_RE = /([\d])/g;
  const SPECIAL_CHAR_RE = /([\?\-])/g;
  const NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

  function isStrongEnough(password: string) {
    var uc = password.match(UPPERCASE_RE);
    var lc = password.match(LOWERCASE_RE);
    var n = password.match(NUMBER_RE);
    var sc = password.match(SPECIAL_CHAR_RE);
    var nr = password.match(NON_REPEATING_CHAR_RE);
    return (
      password.length >= options.minLength &&
      !nr &&
      uc &&
      uc.length >= options.uppercaseMinCount &&
      lc &&
      lc.length >= options.lowercaseMinCount &&
      n &&
      n.length >= options.numberMinCount &&
      sc &&
      sc.length >= options.specialMinCount
    );
  }

  var password = '';
  var randomLength =
    Math.floor(Math.random() * (options.maxLength - options.minLength)) +
    options.minLength;
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
};
