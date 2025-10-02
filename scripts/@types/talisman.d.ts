declare module 'talisman/phonetics/alpha-sis.js' {
  export default function alphaSis(name: string): string[];
}

declare module 'talisman/phonetics/caverphone.js' {
  export function original(name: string): string;
  export function revisited(name: string): string;
}

declare module 'talisman/phonetics/daitch-mokotoff.js' {
  export default function daitchMokotoff(name: string): string;
}

declare module 'talisman/phonetics/eudex.js' {
  export default function eudex(name: string): { high: number; low: number; unsigned: boolean };
}

declare module 'extra-english' {
  declare const english: { caverphonePhonetic(s: string, b?: boolean): string };
  export default english;
}
