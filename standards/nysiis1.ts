// cspell:ignore AIEIOW
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-param-reassign */

// Borrowed from 'dropby.com/nysiis'
// (c) 1999 Matt Pérez
// Licensed under the MIT License.
// [[Converted to TypeScript and modified by Technobuddha 2025]]

// NYSIISEncode computes a surname's NYSIIS code.
export function nysiis1(surname: string): string {
  let suffix;
  surname = surname.toUpperCase();

  // remove "JR", "SR", or Roman Numerals from the end of the name
  // (where "Roman Numerals" can be a malformed run of 'I' and 'V' chars)
  if (
    (suffix = /\s+[JS]R$/u.exec(surname)) != null ||
    (suffix = /\s+[VI]+$/u.exec(surname)) != null
  ) {
    surname = surname.slice(0, Math.max(0, surname.length - suffix[0].length));
  }

  // remove all non-alpha characters
  surname = surname.replaceAll(/[^A-Z]+/gu, '');

  // BEGIN ALGORITHM *******************************************

  // Transcode first characters of name:
  //	   MAC -> MCC
  //	    KN -> NN
  //	     K -> C
  //	PH, PF -> FF
  //	   SCH -> SSS
  if (surname.startsWith('MAC')) {
    surname = surname.replace(/^MAC/u, 'MCC');
  } else if (surname.startsWith('KN')) {
    surname = surname.replace(/^KN/u, 'NN');
  } else if (surname.startsWith('K')) {
    surname = surname.replace(/^K/u, 'C');
  } else if (/^PH|^PF/u.test(surname)) {
    surname = surname.replace(/^PH|^PF/u, 'FF');
  } else if (surname.startsWith('SCH')) {
    surname = surname.replace(/^SCH/u, 'SSS');
  }

  // Transcode two-character suffix as follows,
  //	            EE, IE -> Y
  //	DT, RT, RD, NT, ND -> D
  if (/EE$|IE$/u.test(surname)) {
    surname = surname.replace(/EE$|IE$/u, 'Y');
  } else if (/DT$|RT$|RD$|NT$|ND$/u.test(surname)) {
    surname = surname.replace(/DT$|RT$|RD$|NT$|ND$/u, 'D');
  }

  // Save first char for later, to be used as first char of key
  const firstChar = surname.charAt(0);
  surname = surname.slice(1);

  // Translate remaining characters by following these rules, incrementing by one character each time:
  //	EV	->	AF 	else A,E,I,O,U	->	A
  if (surname.includes('EV')) {
    surname = surname.replaceAll('EV', 'AF');
  }
  // console.log('EV', surname);
  surname = surname.replaceAll(/[AEIOU]+/gu, 'A');
  // console.log('AEIOU', surname);
  //	Q	->	G
  surname = surname.replaceAll('Q', 'G');
  // console.log('Q', surname);
  //	Z	->	S
  surname = surname.replaceAll('Z', 'S');
  // console.log('Z', surname);
  //	M	->	N
  surname = surname.replaceAll('M', 'N');
  // console.log('M', surname);
  //	KN	->	N, else K	->	C
  surname = surname.replaceAll('KN', 'N');
  // console.log('KN', surname);
  surname = surname.replaceAll('K', 'C');
  // console.log('K', surname);
  //	SCH	->	SSS
  surname = surname.replaceAll('SCH', 'SSS');
  // console.log('SCH', surname);
  //	PH	->	FF
  surname = surname.replaceAll('PH', 'FF');
  // console.log('PH', surname);
  //	H	->	If previous or next is nonvowel, previous
  surname = surname.replaceAll(/([^AEIOU])H/gu, '$1');
  // console.log('aeiouH', surname);
  surname = surname.replaceAll(/(.)H[^AEIOU]/gu, '$1');
  // console.log('hAEIOU', surname);
  //	W 	->	If previous is vowel, previous
  surname = surname.replaceAll(/[AEIOU]W/gu, 'A');
  // console.log('AIEIOW', surname);

  // If last character is S, remove it
  surname = surname.replace(/S$/u, '');
  // console.log('S', surname);

  // If last characters are AY, replace with Y
  surname = surname.replace(/AY$/u, 'Y');
  // console.log('AY', surname);

  // If last character is A, remove it
  surname = surname.replace(/A$/u, '');
  // console.log('A', surname);

  // Collapse all strings of repeated characters
  // This is more brute force that it needs to be
  surname = surname.replaceAll(/[AEIOU]+/gu, 'A');
  surname = surname.replaceAll(/B+/gu, 'B');
  surname = surname.replaceAll(/C+/gu, 'C');
  surname = surname.replaceAll(/D+/gu, 'D');
  surname = surname.replaceAll(/F+/gu, 'F');
  surname = surname.replaceAll(/G+/gu, 'G');
  surname = surname.replaceAll(/H+/gu, 'H');
  surname = surname.replaceAll(/J+/gu, 'J');
  surname = surname.replaceAll(/K+/gu, 'K');
  surname = surname.replaceAll(/L+/gu, 'L');
  surname = surname.replaceAll(/M+/gu, 'M');
  surname = surname.replaceAll(/N+/gu, 'N');
  surname = surname.replaceAll(/P+/gu, 'P');
  surname = surname.replaceAll(/Q+/gu, 'Q');
  surname = surname.replaceAll(/R+/gu, 'R');
  surname = surname.replaceAll(/S+/gu, 'S');
  surname = surname.replaceAll(/T+/gu, 'T');
  surname = surname.replaceAll(/V+/gu, 'V');
  surname = surname.replaceAll(/W+/gu, 'W');
  surname = surname.replaceAll(/X+/gu, 'X');
  surname = surname.replaceAll(/Y+/gu, 'Y');
  surname = surname.replaceAll(/Z+/gu, 'Z');
  // console.log('...', surname);

  // Use original first char of surname as first char of key
  surname = firstChar + surname;

  return surname;
}
