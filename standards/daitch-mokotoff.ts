/* eslint-disable @typescript-eslint/prefer-destructuring */
// cspell:disable
// (c) Stephen P. Morse, 2003

const firstLetter = 'a';
const lastLetter = 'z';
const vowels = 'aeioujy';

//newrules = new Array(120);
const newrules: [string, string, string, string][] = [
  ['schtsch', '2', '4', '4'],
  ['schtsh', '2', '4', '4'],
  ['schtch', '2', '4', '4'],
  ['shtch', '2', '4', '4'],
  ['shtsh', '2', '4', '4'],
  ['stsch', '2', '4', '4'],
  ['ttsch', '4', '4', '4'],
  ['zhdzh', '2', '4', '4'],
  ['shch', '2', '4', '4'],
  ['scht', '2', '43', '43'],
  ['schd', '2', '43', '43'],
  ['stch', '2', '4', '4'],
  ['strz', '2', '4', '4'],
  ['strs', '2', '4', '4'],
  ['stsh', '2', '4', '4'],
  ['szcz', '2', '4', '4'],
  ['szcs', '2', '4', '4'],
  ['ttch', '4', '4', '4'],
  ['tsch', '4', '4', '4'],
  ['ttsz', '4', '4', '4'],
  ['zdzh', '2', '4', '4'],
  ['zsch', '4', '4', '4'],
  ['chs', '5', '54', '54'],
  ['csz', '4', '4', '4'],
  ['czs', '4', '4', '4'],
  ['drz', '4', '4', '4'],
  ['drs', '4', '4', '4'],
  ['dsh', '4', '4', '4'],
  ['dsz', '4', '4', '4'],
  ['dzh', '4', '4', '4'],
  ['dzs', '4', '4', '4'],
  ['sch', '4', '4', '4'],
  ['sht', '2', '43', '43'],
  ['szt', '2', '43', '43'],
  ['shd', '2', '43', '43'],
  ['szd', '2', '43', '43'],
  ['tch', '4', '4', '4'],
  ['trz', '4', '4', '4'],
  ['trs', '4', '4', '4'],
  ['tsh', '4', '4', '4'],
  ['tts', '4', '4', '4'],
  ['ttz', '4', '4', '4'],
  ['tzs', '4', '4', '4'],
  ['tsz', '4', '4', '4'],
  ['zdz', '2', '4', '4'],
  ['zhd', '2', '43', '43'],
  ['zsh', '4', '4', '4'],
  ['ai', '0', '1', '999'],
  ['aj', '0', '1', '999'],
  ['ay', '0', '1', '999'],
  ['au', '0', '7', '999'],
  ['cz', '4', '4', '4'],
  ['cs', '4', '4', '4'],
  ['ds', '4', '4', '4'],
  ['dz', '4', '4', '4'],
  ['dt', '3', '3', '3'],
  ['ei', '0', '1', '999'],
  ['ej', '0', '1', '999'],
  ['ey', '0', '1', '999'],
  ['eu', '1', '1', '999'],
  ['ia', '1', '999', '999'],
  ['ie', '1', '999', '999'],
  ['io', '1', '999', '999'],
  ['iu', '1', '999', '999'],
  ['ks', '5', '54', '54'],
  ['kh', '5', '5', '5'],
  ['mn', '66', '66', '66'],
  ['nm', '66', '66', '66'],
  ['oi', '0', '1', '999'],
  ['oj', '0', '1', '999'],
  ['oy', '0', '1', '999'],
  ['pf', '7', '7', '7'],
  ['ph', '7', '7', '7'],
  ['sh', '4', '4', '4'],
  ['sc', '2', '4', '4'],
  ['st', '2', '43', '43'],
  ['sd', '2', '43', '43'],
  ['sz', '4', '4', '4'],
  ['th', '3', '3', '3'],
  ['ts', '4', '4', '4'],
  ['tc', '4', '4', '4'],
  ['tz', '4', '4', '4'],
  ['ui', '0', '1', '999'],
  ['uj', '0', '1', '999'],
  ['uy', '0', '1', '999'],
  ['ue', '0', '1', '999'],
  ['zd', '2', '43', '43'],
  ['zh', '4', '4', '4'],
  ['zs', '4', '4', '4'],
  ['rz', '4', '4', '4'],
  ['ch', '5', '5', '5'],
  ['ck', '5', '5', '5'],
  //["rs", "4", "4", "4"],
  ['fb', '7', '7', '7'],
  ['a', '0', '999', '999'],
  ['b', '7', '7', '7'],
  ['d', '3', '3', '3'],
  ['e', '0', '999', '999'],
  ['f', '7', '7', '7'],
  ['g', '5', '5', '5'],
  ['h', '5', '5', '999'],
  ['i', '0', '999', '999'],
  ['k', '5', '5', '5'],
  ['l', '8', '8', '8'],
  ['m', '6', '6', '6'],
  ['n', '6', '6', '6'],
  ['o', '0', '999', '999'],
  ['p', '7', '7', '7'],
  ['q', '5', '5', '5'],
  ['r', '9', '9', '9'],
  ['s', '4', '4', '4'],
  ['t', '3', '3', '3'],
  ['u', '0', '999', '999'],
  ['v', '7', '7', '7'],
  ['w', '7', '7', '7'],
  ['x', '5', '54', '54'],
  ['y', '1', '999', '999'],
  ['z', '4', '4', '4'],
  ['c', '5', '5', '5'],
  ['j', '1', '999', '999'],
];

// Now branching cases
const xnewrules: [string, string, string, string][] = [
  ['rz', '94', '94', '94'],
  ['ch', '4', '4', '4'],
  ['ck', '45', '45', '45'],
  //["rs", "94", "94", "94"],
  ['c', '4', '4', '4'],
  ['j', '4', '4', '4'],
];

const xnewruleslist = '!rz!ch!ck!c!!j!'; // temporarily remove rs
//var xnewruleslist = "!rz!ch!ck!rs!c!!j!";

// (c) Stephen P. Morse, 2003

const SEPARATOR = ' ';

export function daitchMokotoff(input: string): string[] {
  let myStr = input;

  // replace certain text in strings with a slash
  const re = / v | v\. | vel | aka | f | f. | r | r. | false | recte | on zhe /giv;
  myStr = myStr.replaceAll(re, '/');

  if (myStr === '') {
    return [];
  }

  // append soundex of each individual word
  const result: string[] = [];
  const myStrArray = myStr.split(/[\s\|,]+/v); // use space or comma as token delimiter
  for (const str of myStrArray) {
    if (str.length > 0) {
      result.push(...soundex2(str).split(' '));
    }
  }
  return result.sort();
}

function soundex2(input: string): string {
  let myStr = input.toLowerCase();
  let myStr3 = myStr;

  let dm3 = '';
  while (myStr3.length > 0) {
    let myStr2 = '';
    const lenMyStr3 = myStr3.length;

    let i: number;
    for (i = 0; i < myStr3.length; i++) {
      if (
        (myStr3.charAt(i) >= firstLetter && myStr3.charAt(i) <= lastLetter) ||
        myStr3.charAt(i) === '/'
      ) {
        if (myStr3.charAt(i) === '/') {
          myStr3 = myStr3.slice(i + 1);
          break;
        } else {
          myStr2 += myStr3.charAt(i);
        }
      } else if (myStr.charAt(i) === '(' || myStr.charAt(i) === SEPARATOR) {
        break;
      }
    }
    if (i === lenMyStr3) {
      myStr3 = ''; // finished
    }

    myStr = myStr2;

    let ii: number;

    let dm = '';
    let allblank = true;
    for (let k = 0; k < myStr.length; k++) {
      if (myStr.charAt(k) !== ' ') {
        allblank = false;
        break;
      }
    }

    if (!allblank) {
      let dimDM2 = 1;
      const dm2: string[] = Array.from({ length: 16 });
      dm2[0] = '';

      let first = 1;
      const lastdm = Array.from({ length: 16 });
      lastdm[0] = '';

      while (myStr.length > 0) {
        for (i = 0; i < newrules.length; i++) {
          // loop through the rules
          if (myStr.startsWith(newrules[i][0])) {
            // match found
            //check for xnewrules branch
            const xxr = `!${newrules[i][0]}!`;
            let xr: number;
            if (xnewruleslist.includes(xxr)) {
              xr = xnewruleslist.indexOf(xxr) / 3;
              for (let dmm = dimDM2; dmm < 2 * dimDM2; dmm++) {
                dm2[dmm] = dm2[dmm - dimDM2];
                lastdm[dmm] = lastdm[dmm - dimDM2];
              }
              dimDM2 *= 2;
            } else {
              xr = -1;
            }

            dm += `_${newrules[i][0]}`;
            myStr = myStr.length > newrules[i][0].length ? myStr.slice(newrules[i][0].length) : '';

            if (first === 1) {
              dm2[0] = newrules[i][1];
              first = 0;
              lastdm[0] = newrules[i][1];

              if (xr >= 0) {
                dm2[1] = xnewrules[xr][1];
                lastdm[1] = xnewrules[xr][1];
              }
            } else {
              let dmnumber = 1;
              if (dimDM2 > 1) {
                dmnumber = dimDM2 / 2;
              }
              if (myStr.length > 0 && vowels.includes(myStr.charAt(0))) {
                // followed by a vowel
                for (ii = 0; ii < dmnumber; ii++) {
                  if (newrules[i][2] !== '999' && newrules[i][2] !== lastdm[ii]) {
                    // vowel following, non-branching case, not a vowel and different code from previous one
                    lastdm[ii] = newrules[i][2];
                    dm2[ii] += newrules[i][2];
                  } else if (newrules[i][3] === '999') {
                    // should this be newrules[i][2] ?
                    // vowel following, non-branching case, is a vowel, so reset previous one to blank
                    lastdm[ii] = '';
                  }
                  // else non-branching case, not a vowel and same code from previous one -- do nothing
                }

                if (dimDM2 > 1) {
                  for (ii = dmnumber; ii < dimDM2; ii++) {
                    if (xr >= 0 && xnewrules[xr][2] !== '999' && xnewrules[xr][2] !== lastdm[ii]) {
                      // vowel following, branching case, not a vowel and different code from prevous case
                      lastdm[ii] = xnewrules[xr][2];
                      dm2[ii] += xnewrules[xr][2];

                      // not in original code -- added for dm hebrew, never encountered used in dm latin
                      // occurs only when a vowel is in the branching case (e.g., the VAV in hebrew)
                    } else if (xr >= 0 && xnewrules[xr][2] === '999') {
                      // vowel following, branching case, is a vowel, so reset previous one to blank
                      lastdm[ii] = '';
                    } else if (
                      xr < 0 &&
                      newrules[i][2] !== '999' &&
                      newrules[i][2] !== lastdm[ii]
                    ) {
                      // vowel following, non-branching case, not a vowel and different code from prevous case
                      lastdm[ii] = newrules[i][2];
                      dm2[ii] += newrules[i][2];
                    } else if (newrules[i][3] === '999') {
                      // should this be newrules[i][2] ?
                      // vowel following, non-branching case, is a vowel, so reset previous one to blank
                      lastdm[ii] = '';
                    }
                  }
                }
              } else {
                for (ii = 0; ii < dmnumber; ii++) {
                  if (newrules[i][3] !== '999' && newrules[i][3] !== lastdm[ii]) {
                    // non-branching case, not a vowel and different code from prevous case
                    lastdm[ii] = newrules[i][3];
                    dm2[ii] += newrules[i][3];
                  } else if (newrules[i][3] === '999') {
                    // non-branching case, is a vowel, so reset previous one to blank
                    lastdm[ii] = '';
                  }
                  // else non-branching case, not a vowel and same code from previous one -- do nothing
                }
                if (dimDM2 > 1) {
                  for (ii = dmnumber; ii < dimDM2; ii++) {
                    if (xr >= 0 && xnewrules[xr][3] !== '999' && xnewrules[xr][3] !== lastdm[ii]) {
                      // branching case, not a vowel and different code from prevous case
                      lastdm[ii] = xnewrules[xr][3];
                      dm2[ii] += xnewrules[xr][3];

                      // not in original code -- added for dm hebrew, never encountered used in dm latin
                      // occurs only when a vowel is in the branching case (e.g., the VAV in hebrew)
                    } else if (xr >= 0 && xnewrules[xr][3] === '999') {
                      // branching case, is a vowel, so reset previous one to blank
                      lastdm[ii] = '';
                    } else if (
                      xr < 0 &&
                      newrules[i][3] !== '999' &&
                      newrules[i][3] !== lastdm[ii]
                    ) {
                      // non-branching case, not a vowel and different code from prevous case
                      lastdm[ii] = newrules[i][3];
                      dm2[ii] += newrules[i][3];
                    } else if (newrules[i][3] === '999') {
                      // non-branching case, is a vowel, so reset previous one to blank
                      lastdm[ii] = '';
                    }
                  }
                }
              }
            }

            break; // stop looping through rules
          } // end of match found
        } // end of looping through the rules
      } // end of while (MyStr.length) > 0)
      dm = '';
      for (ii = 0; ii < dimDM2; ii++) {
        dm2[ii] = `${dm2[ii]}000000`.slice(0, 6);
        if (ii === 0 && !dm.includes(dm2[ii]) && !dm3.includes(dm2[ii])) {
          dm = dm2[ii];
        } else if (!dm.includes(dm2[ii]) && !dm3.includes(dm2[ii])) {
          dm = dm.length > 0 ? dm + SEPARATOR + dm2[ii] : dm2[ii];
        }
      }

      if (dm3.length > 0 && !dm3.includes(dm)) {
        dm3 = dm3 + SEPARATOR + dm;
      } else if (dm.length > 0) {
        dm3 = dm;
      }
    }
  } // end of while

  return dm3;
}
