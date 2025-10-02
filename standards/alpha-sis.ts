import { removeDiacritics, unique } from "@technobuddha/library";

/**
 * Constants.
 */
const INITIALS: [string, string][] = [
  ["GF", "08"],
  ["GM", "03"],
  ["GN", "02"],
  ["KN", "02"],
  ["PF", "08"],
  ["PN", "02"],
  ["PS", "00"],
  ["WR", "04"],
  ["A", "1"],
  ["E", "1"],
  ["H", "2"],
  ["I", "1"],
  ["J", "3"],
  ["O", "1"],
  ["U", "1"],
  ["W", "4"],
  ["Y", "5"],
];

const BASICS: [string, string | string[]][] = [
  ["SCH", "6"],
  ["CZ", ["70", "6", "0"]],
  ["CH", ["6", "70", "0"]],
  ["CK", ["7", "6"]],
  ["DS", ["0", "10"]],
  ["DZ", ["0", "10"]],
  ["TS", ["0", "10"]],
  ["TZ", ["0", "10"]],
  ["CI", "0"],
  ["CY", "0"],
  ["CE", "0"],
  ["SH", "6"],
  ["DG", "7"],
  ["PH", "8"],
  ["C", ["7", "6"]],
  ["K", ["7", "6"]],
  ["Z", "0"],
  ["S", "0"],
  ["D", "1"],
  ["T", "1"],
  ["N", "2"],
  ["M", "3"],
  ["R", "4"],
  ["L", "5"],
  ["J", "6"],
  ["G", "7"],
  ["Q", "7"],
  ["X", "7"],
  ["F", "8"],
  ["V", "8"],
  ["B", "9"],
  ["P", "9"],
];

/**
 * Helpers.
 */
function pad(code: string): string {
  return `${code}00000000000000`.slice(0, 14);
}

function permutations(code: (string | string[])[]): string[] {
  const codes: string[] = [""];

  for (let i = 0, l = code.length; i < l; i++) {
    const current = code[i];

    if (typeof current === "object") {
      // Doubling the codes
      for (let j = 0, m = codes.length * (current.length - 1); j < m; j++) {
        codes.push(codes[j]);
      }

      // Filling the codes
      const offset = codes.length / current.length;

      for (let j = 0, k = 0, m = current.length; j < m; j++) {
        const encoding = current[j];

        while (k < offset) {
          codes[k + j * offset] += encoding;
          k++;
        }

        k = 0;
      }
    } else {
      for (let j = 0, m = codes.length; j < m; j++) {
        codes[j] += current;
      }
    }
  }

  return codes;
}

export function alphaSis(input: string): string[] {
  const name = removeDiacritics(input)
    .toUpperCase()
    .replaceAll(/[^A-Z]/gv, "");

  if (name === "") {
    return [];
  }

  const code = [];

  let position = 0;

  // Handling initial substring
  for (let i = 0, l = INITIALS.length; i < l; i++) {
    const [substring, encoding] = INITIALS[i];

    if (name.startsWith(substring)) {
      code.push(encoding);
      position += substring.length;
      break;
    }
  }

  // If the beginning of the string is not present in initial, we put '0'
  if (!code[0]) {
    code.push("0");
  }

  // Encoding the remaining
  const { length } = name;

  main: while (position < length) {
    for (let i = 0, l = BASICS.length; i < l; i++) {
      const [substring, encoding] = BASICS[i];

      if (name.slice(position).startsWith(substring)) {
        code.push(encoding);
        position += substring.length;
        continue main;
      }
    }

    code.push("_");
    position++;
  }

  return unique(
    permutations(code).map((c) => pad(c.replaceAll(/(.)\1+/gv, "$1").replaceAll("_", ""))),
  ).sort();
}
