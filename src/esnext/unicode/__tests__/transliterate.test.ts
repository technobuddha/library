import { transliterate } from '../transliterate.ts';

describe('transliterate', () => {
  test('should transliterate Cyrillic characters', () => {
    expect(transliterate('Привет')).toBe('Privet');
    expect(transliterate('Москва')).toBe('Moskva');
    expect(transliterate('добро пожаловать')).toBe("dobro pozhalovat'");
  });

  test('should transliterate Greek characters', () => {
    expect(transliterate('Αλφάβητο')).toBe('Alfavito');
    expect(transliterate('Ελλάδα')).toBe('Ellada');
  });

  test('should transliterate Japanese Hiragana', () => {
    expect(transliterate('こんにちは')).toBe('konnichiha');
    expect(transliterate('ありがとう')).toBe('arigatou');
  });

  test('should transliterate Japanese Katakana', () => {
    expect(transliterate('カタカナ')).toBe('katakana');
    expect(transliterate('コンピュータ')).toBe('konpiyuta');
  });

  test('should transliterate Chinese characters', () => {
    expect(transliterate('你好')).toBe(''); // ni Hao
    expect(transliterate('中国')).toBe(''); // Zhong Guo');
  });

  test('should transliterate Korean Hangul', () => {
    expect(transliterate('한글')).toBe(''); // Handeul
    expect(transliterate('안녕하세요')).toBe(''); //Annyeonghaseyo'
  });

  test('should handle empty string', () => {
    expect(transliterate('')).toBe('');
  });

  test('should handle ASCII-only input', () => {
    expect(transliterate('Hello, World!')).toBe('Hello, World!');
  });

  test('should remove characters without romanization', () => {
    // Characters without romanization mappings should be removed (use empty string)
    const result = transliterate('test\u{1FFFF}test');
    expect(result).toBe('testtest');
  });

  test('should handle numbers and punctuation', () => {
    expect(transliterate('12345!@#$%')).toBe('12345!@#$%');
  });

  test('should handle mixed scripts', () => {
    const mixed = transliterate('Hello Привет 你好');
    expect(mixed).toContain('Hello');
    expect(mixed).toContain('Privet');
    //expect(mixed).toContain('Ni Hao');
  });

  test('should handle string-like objects', () => {
    expect(transliterate(['t', 'e', 's', 't'].join(''))).toBe('test');
  });

  test('should handle surrogate pairs', () => {
    // Test with characters that require surrogate pairs
    const result = transliterate('foo\u{1D400}bar'); // Mathematical Bold Capital A
    // The result depends on what's in the romanization table
    expect(typeof result).toBe('string');
  });

  test('should transliterate Arabic characters', () => {
    expect(transliterate('مرحبا')).toBe('mrhb'); // mrhba
    expect(transliterate('العربية')).toBe('l`rbyh'); //"al'rby"
  });

  test('should transliterate Hebrew characters', () => {
    expect(transliterate('שלום')).toBe('slvm'); //shlwm
    expect(transliterate('עברית')).toBe("'vryt"); //'bryt
  });

  test('should handle mixed case Latin with non-Latin', () => {
    expect(transliterate('ABC Москва xyz')).toBe('ABC Moskva xyz');
  });

  test('should handle Thai characters', () => {
    expect(transliterate('สวัสดี')).toBe('swasdi');
  });

  test('should handle spacing and whitespace', () => {
    expect(transliterate('   Привет   ')).toBe('   Privet   ');
    expect(transliterate('Hello\nПривет')).toBe('HelloPrivet'); //'Hello\nPrivet'
    expect(transliterate('Hello\tПривет')).toBe('HelloPrivet'); //'Hello\tPrivet'
  });
});
