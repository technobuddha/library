/* eslint-disable require-unicode-regexp */
/* eslint-disable no-param-reassign */
// NYSIISEncode computes a surname's NYSIIS code.
export function nysiis2(surname: string): string {
  let suffix;

  // trim whitespace from right of string
  surname = surname.replace(/\s+$/, '').toUpperCase();

  // remove "JR", "SR", or Roman Numerals from the end of the name
  // (where "Roman Numerals" can be a malformed run of 'I' and 'V' chars)
  if (
    (suffix = /\s+[JS]R$/.exec(surname)) != null ||
    (suffix = /\s+[VI]+$/.exec(surname)) != null
  ) {
    surname = surname.slice(0, Math.max(0, surname.length - suffix[0].length));
  }

  // remove all non-alpha characters
  surname = surname.replaceAll(/[^A-Z]+/g, '');

  // BEGIN ALGORITHM *******************************************
  // Save first char for later
  // (if first char is a vowel, it is used as first char of code)
  // if the first character of the surname is a vowel, remember it

  // remove all 'S' and 'Z' chars from the end of the surname
  if (/[SZ]+$/v.test(surname)) {
    surname = surname.replace(/[SZ]+$/, '');
    if (surname.length === 0) {
      surname = 'S';
    }
  }

  // change initial MAC to MC and initial PF to F
  if (surname.startsWith('MAC')) {
    surname = surname.replace(/^MAC/, 'MC');
  } else if (surname.startsWith('PF')) {
    surname = surname.replace(/^PF/, 'F');
  }

  // Change two-character suffix as follows,
  //	                IX -> IC
  //	                EX -> EC
  //	        YE, EE, IE -> Y
  //	DT, RT, RD, NT, ND -> D
  if (surname.endsWith('IX')) {
    surname = surname.replace(/IX$/, 'IC');
  } else if (surname.endsWith('EX')) {
    surname = surname.replace(/EX$/, 'EC');
  } else if (/YE$|EE$|IE$/.test(surname)) {
    surname = surname.replace(/YE$|EE$|IE$/, 'Y');
  } else {
    while (/DT$|RT$|RD$|NT$|ND$/.test(surname)) {
      surname = surname.replace(/DT$|RT$|RD$|NT$|ND$/, 'D');
    }
  }

  // Change 'EV' to 'EF' if not at start of name
  surname =
    surname.startsWith('EV') ?
      `EV${surname.slice(2).replaceAll('EV', 'EF')}`
    : surname.replaceAll('EV', 'EF');

  // Save first char for later
  // (if first char is a vowel, it is used as first char of code)
  const firstChar = surname.charAt(0);

  // Remove any 'W' that follows a vowel
  surname = surname.replaceAll(/([AEIOU])W/gv, 'A');

  // Replace all vowels with 'A' and collapse all strings of 'A' to one 'A'
  surname = surname.replaceAll(/[AEIOU]+/gv, 'A');

  // Change 'GHT' to 'GT'
  surname = surname.replaceAll('GHT', 'GT');

  // Change 'DG' to 'G'
  surname = surname.replaceAll('DG', 'G');

  // Change 'PH' to 'F'
  surname = surname.replaceAll('PH', 'F');

  // If not first character, eliminate all 'H' preceded or followed by a vowel
  surname =
    surname.startsWith('H') ?
      `H${surname.slice(1).replaceAll(/AH|HA/gv, 'A')}`
    : surname.replaceAll(/AH|HA/gv, 'A');

  // Change 'KN' to 'N', else 'K' to 'C'
  surname = surname.replaceAll('KN', 'N');
  surname = surname.replaceAll('K', 'C');

  // If not first character, change 'M' to 'N'
  surname =
    surname.startsWith('M') ?
      `M${surname.slice(1).replaceAll('M', 'N')}`
    : surname.replaceAll('M', 'N');

  // If not first character, change 'Q' to 'G'
  surname =
    surname.startsWith('Q') ?
      `Q${surname.slice(1).replaceAll('Q', 'G')}`
    : surname.replaceAll('Q', 'G');

  // Change 'SH' to 'S'
  surname = surname.replaceAll('SH', 'S');

  // Change 'SCH' to 'S'
  surname = surname.replaceAll('SCH', 'S');

  // Change 'YW' to 'Y'
  surname = surname.replace(/YW/v, 'Y');

  // If not first or last character, change 'Y' to 'A'
  if (surname.startsWith('Y') && surname.endsWith('Y')) {
    surname = `Y${surname.slice(1, -1).replaceAll('Y', 'A')}Y`;
  } else if (surname.startsWith('Y')) {
    surname = `Y${surname.slice(1).replaceAll('Y', 'A')}`;
  } else if (surname.endsWith('Y')) {
    surname = `${surname.slice(0, -1).replaceAll('Y', 'A')}Y`;
  } else {
    surname = surname.replaceAll('Y', 'A');
  }

  // Change 'WR' to 'R'
  surname = surname.replaceAll('WR', 'R');

  // If not first character, change 'Z' to 'S'
  surname =
    surname.startsWith('Z') ?
      `Z${surname.slice(1).replaceAll('Z', 'S')}`
    : surname.replaceAll('Z', 'S');

  // Change terminal 'AY' to 'Y'
  surname = surname.replace(/AY$/v, 'Y');

  // remove trailing vowels
  surname = surname.replace(/A+$/v, '');

  // Collapse all strings of repeated characters
  // This is more brute force that it needs to be
  surname = surname.replaceAll(/[AEIOU]+/gv, 'A');
  surname = surname.replaceAll(/B+/gv, 'B');
  surname = surname.replaceAll(/C+/gv, 'C');
  surname = surname.replaceAll(/D+/gv, 'D');
  surname = surname.replaceAll(/F+/gv, 'F');
  surname = surname.replaceAll(/G+/gv, 'G');
  surname = surname.replaceAll(/H+/gv, 'H');
  surname = surname.replaceAll(/J+/gv, 'J');
  surname = surname.replaceAll(/K+/gv, 'K');
  surname = surname.replaceAll(/L+/gv, 'L');
  surname = surname.replaceAll(/M+/gv, 'M');
  surname = surname.replaceAll(/N+/gv, 'N');
  surname = surname.replaceAll(/P+/gv, 'P');
  surname = surname.replaceAll(/Q+/gv, 'Q');
  surname = surname.replaceAll(/R+/gv, 'R');
  surname = surname.replaceAll(/S+/gv, 'S');
  surname = surname.replaceAll(/T+/gv, 'T');
  surname = surname.replaceAll(/V+/gv, 'V');
  surname = surname.replaceAll(/W+/gv, 'W');
  surname = surname.replaceAll(/X+/gv, 'X');
  surname = surname.replaceAll(/Y+/gv, 'Y');
  surname = surname.replaceAll(/Z+/gv, 'Z');

  // if first char of original surname is a vowel,
  // use it as first char of code (instead of transcoded 'A')
  if (/^[AEIOU]/.test(firstChar)) {
    surname = surname.replace(/^A*/v, firstChar);
  }

  return surname;
}
