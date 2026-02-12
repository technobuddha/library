/* eslint-disable @typescript-eslint/explicit-function-return-type */

class Soundex {
  public codes: Record<string, string> = {};
  public constructor() {
    this.codes = {
      a: '',
      e: '',
      i: '',
      o: '',
      u: '',
      b: '1',
      f: '1',
      p: '1',
      v: '1',
      c: '2',
      g: '2',
      j: '2',
      k: '2',
      q: '2',
      s: '2',
      x: '2',
      z: '2',
      d: '3',
      t: '3',
      l: '4',
      m: '5',
      n: '5',
      r: '6',
    };
  }
  public getPhoneticString(text: string): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  no-multi-assign
    const stdTrace: string[] = ((globalThis as any).stdTrace = []);

    const str = text.toLowerCase();
    if (str === '') {
      return '';
    }
    const f = str[0] || '';

    let r = '';
    let code = null;
    const { length } = str;

    for (let i = 1; i < length; i++) {
      if ((code = this.codes[str[i]]) == null) {
        stdTrace.push(`Char: ${str[i]} NOCode`);
        continue;
      } else if (i > 1 && code === this.codes[str[i - 1]]) {
        stdTrace.push(`Char: ${str[i]} DUPLICATE`);
        continue;
      }
      stdTrace.push(`Char: ${str[i]} Code: ${code}`);
      r += code;
    }

    return `${f + r}000`.slice(0, 4);
  }
  public isPhoneticMatch(text1: string, text2: string): boolean {
    return this.getPhoneticString(text1) === this.getPhoneticString(text2);
  }
}

export const soundexP123 = (input: string) => new Soundex().getPhoneticString(input).toUpperCase();
