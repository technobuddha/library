import { mathTokenize } from '../math-tokenizer.ts';

describe('tokenize', () => {
  describe('numbers', () => {
    test('should tokenize integers', () => {
      expect(mathTokenize('42')).toEqual(['42']);
      expect(mathTokenize('0')).toEqual(['0']);
      expect(mathTokenize('123456789')).toEqual(['123456789']);
    });

    test('should tokenize decimal numbers', () => {
      expect(mathTokenize('3.14')).toEqual(['3.14']);
      expect(mathTokenize('0.5')).toEqual(['0.5']);
      expect(mathTokenize('.5')).toEqual(['.5']);
    });

    test('should tokenize scientific notation with lowercase e', () => {
      expect(mathTokenize('1e10')).toEqual(['1e10']);
      expect(mathTokenize('2.5e3')).toEqual(['2.5e3']);
      expect(mathTokenize('1e+10')).toEqual(['1e+10']);
      expect(mathTokenize('2.5e-3')).toEqual(['2.5e-3']);
    });

    test('should tokenize scientific notation with uppercase E', () => {
      expect(mathTokenize('1E10')).toEqual(['1E10']);
      expect(mathTokenize('1.5E10')).toEqual(['1.5E10']);
      expect(mathTokenize('1E+10')).toEqual(['1E+10']);
      expect(mathTokenize('3E-5')).toEqual(['3E-5']);
    });

    test('should tokenize multiple numbers', () => {
      expect(mathTokenize('1 2 3')).toEqual(['1', '2', '3']);
      expect(mathTokenize('3.14 2.71')).toEqual(['3.14', '2.71']);
    });
  });

  describe('identifiers', () => {
    test('should tokenize single letter identifiers', () => {
      expect(mathTokenize('x')).toEqual(['x']);
      expect(mathTokenize('a')).toEqual(['a']);
      expect(mathTokenize('X')).toEqual(['X']);
    });

    test('should tokenize multi-character identifiers', () => {
      expect(mathTokenize('pi')).toEqual(['pi']);
      expect(mathTokenize('radius')).toEqual(['radius']);
      expect(mathTokenize('myVar')).toEqual(['myVar']);
    });

    test('should tokenize identifiers with underscores', () => {
      expect(mathTokenize('_temp')).toEqual(['_temp']);
      expect(mathTokenize('my_var')).toEqual(['my_var']);
      expect(mathTokenize('_')).toEqual(['_']);
    });

    test('should tokenize identifiers with numbers', () => {
      expect(mathTokenize('x1')).toEqual(['x1']);
      expect(mathTokenize('var2')).toEqual(['var2']);
      expect(mathTokenize('x1y2')).toEqual(['x1y2']);
    });

    test('should tokenize Unicode identifiers', () => {
      expect(mathTokenize('π')).toEqual(['π']);
      expect(mathTokenize('α')).toEqual(['α']);
      expect(mathTokenize('θ')).toEqual(['θ']);
    });

    test('should keep identifier with digits together', () => {
      expect(mathTokenize('pi3')).toEqual(['pi3']);
      expect(mathTokenize('x3')).toEqual(['x3']);
      expect(mathTokenize('x 3')).toEqual(['x', '3']);
    });
  });

  describe('operators', () => {
    test('should tokenize basic arithmetic operators', () => {
      expect(mathTokenize('+')).toEqual(['+']);
      expect(mathTokenize('-')).toEqual(['-']);
      expect(mathTokenize('*')).toEqual(['*']);
      expect(mathTokenize('/')).toEqual(['/']);
      expect(mathTokenize('%')).toEqual(['%']);
      expect(mathTokenize('^')).toEqual(['^']);
    });

    test('should tokenize Unicode operators', () => {
      expect(mathTokenize('×')).toEqual(['×']);
      expect(mathTokenize('÷')).toEqual(['÷']);
      expect(mathTokenize('√')).toEqual(['√']);
    });

    test('should tokenize postfix operators', () => {
      expect(mathTokenize('!')).toEqual(['!']);
      expect(mathTokenize('²')).toEqual(['²']);
      expect(mathTokenize('³')).toEqual(['³']);
    });

    test('should tokenize multi-character operators', () => {
      expect(mathTokenize('//')).toEqual(['//']);
      expect(mathTokenize('**')).toEqual(['**']);
    });

    test('should tokenize parentheses and delimiters', () => {
      expect(mathTokenize('(')).toEqual(['(']);
      expect(mathTokenize(')')).toEqual([')']);
      expect(mathTokenize('|')).toEqual(['|']);
    });

    test('should not confuse // with two / operators', () => {
      expect(mathTokenize('//')).toEqual(['//']);
      expect(mathTokenize('/ /')).toEqual(['/', '/']);
      expect(mathTokenize('10//2')).toEqual(['10', '//', '2']);
      expect(mathTokenize('x//5')).toEqual(['x', '//', '5']);
    });

    test('should not confuse ** with two * operators', () => {
      expect(mathTokenize('**')).toEqual(['**']);
      expect(mathTokenize('* *')).toEqual(['*', '*']);
      expect(mathTokenize('2**3')).toEqual(['2', '**', '3']);
      expect(mathTokenize('y**2')).toEqual(['y', '**', '2']);
    });
  });

  describe('expressions', () => {
    test('should tokenize simple arithmetic expressions', () => {
      expect(mathTokenize('2 + 3')).toEqual(['2', '+', '3']);
      expect(mathTokenize('10 - 5')).toEqual(['10', '-', '5']);
      expect(mathTokenize('4 * 6')).toEqual(['4', '*', '6']);
      expect(mathTokenize('8 / 2')).toEqual(['8', '/', '2']);
    });

    test('should tokenize complex expressions', () => {
      expect(mathTokenize('2 * (3 + 4)')).toEqual(['2', '*', '(', '3', '+', '4', ')']);
      expect(mathTokenize('x ^ 2 + y ^ 2')).toEqual(['x', '^', '2', '+', 'y', '^', '2']);
    });

    test('should tokenize expressions with variables', () => {
      expect(mathTokenize('2 * x + 3')).toEqual(['2', '*', 'x', '+', '3']);
      expect(mathTokenize('a + b * c')).toEqual(['a', '+', 'b', '*', 'c']);
    });

    test('should tokenize expressions without spaces', () => {
      expect(mathTokenize('2+3')).toEqual(['2', '+', '3']);
      expect(mathTokenize('x*y')).toEqual(['x', '*', 'y']);
      expect(mathTokenize('(a+b)')).toEqual(['(', 'a', '+', 'b', ')']);
    });

    test('should tokenize expressions with mixed spacing', () => {
      expect(mathTokenize('2+ 3')).toEqual(['2', '+', '3']);
      expect(mathTokenize('x *y')).toEqual(['x', '*', 'y']);
      expect(mathTokenize(' a + b ')).toEqual(['a', '+', 'b']);
    });
  });

  describe('whitespace handling', () => {
    test('should ignore spaces', () => {
      expect(mathTokenize('  2   +   3  ')).toEqual(['2', '+', '3']);
    });

    test('should ignore tabs', () => {
      expect(mathTokenize('2\t+\t3')).toEqual(['2', '+', '3']);
    });

    test('should ignore newlines', () => {
      expect(mathTokenize('2\n+\n3')).toEqual(['2', '+', '3']);
    });

    test('should ignore carriage returns', () => {
      expect(mathTokenize('2\r+\r3')).toEqual(['2', '+', '3']);
    });

    test('should ignore mixed whitespace', () => {
      expect(mathTokenize(' \t\n\r2\t\n\r +\n\r\t 3 \t\n\r')).toEqual(['2', '+', '3']);
    });

    test('should handle non-breaking space', () => {
      expect(mathTokenize('2\u00a0+\u00a03')).toEqual(['2', '+', '3']);
      expect(mathTokenize('x\u00a0*\u00a0y')).toEqual(['x', '*', 'y']);
    });

    test('should handle various Unicode whitespace characters', () => {
      // Em space (U+2003), Thin space (U+2009)
      expect(mathTokenize('2\u2003+\u20093')).toEqual(['2', '+', '3']);
      expect(mathTokenize('a\u2003*\u2009b')).toEqual(['a', '*', 'b']);
    });
  });

  describe('special cases', () => {
    test('should tokenize empty string', () => {
      expect(mathTokenize('')).toEqual([]);
    });

    test('should tokenize whitespace only', () => {
      expect(mathTokenize('   ')).toEqual([]);
      expect(mathTokenize('\t\n\r')).toEqual([]);
    });

    test('should tokenize factorial', () => {
      expect(mathTokenize('5!')).toEqual(['5', '!']);
      expect(mathTokenize('(2 + 3)!')).toEqual(['(', '2', '+', '3', ')', '!']);
    });

    test('should tokenize superscripts', () => {
      expect(mathTokenize('3²')).toEqual(['3', '²']);
      expect(mathTokenize('2³')).toEqual(['2', '³']);
    });

    test('should tokenize absolute value', () => {
      expect(mathTokenize('|x|')).toEqual(['|', 'x', '|']);
      expect(mathTokenize('|-5|')).toEqual(['|', '-', '5', '|']);
    });

    test('should tokenize square root', () => {
      expect(mathTokenize('√16')).toEqual(['√', '16']);
      expect(mathTokenize('√(x + y)')).toEqual(['√', '(', 'x', '+', 'y', ')']);
    });

    test('should handle dot at start (decimal number)', () => {
      expect(mathTokenize('.5 + .3')).toEqual(['.5', '+', '.3']);
    });

    test('should keep identifier with digits together', () => {
      expect(mathTokenize('pi3')).toEqual(['pi3']);
      expect(mathTokenize('x3')).toEqual(['x3']);
      expect(mathTokenize('x 3')).toEqual(['x', '3']);
    });

    test('should handle e as both number part and identifier', () => {
      expect(mathTokenize('1e10')).toEqual(['1e10']); // scientific notation
      expect(mathTokenize('1 e 10')).toEqual(['1', 'e', '10']); // e as variable with spaces
      expect(mathTokenize('e + 1')).toEqual(['e', '+', '1']); // e as variable
      expect(mathTokenize('e')).toEqual(['e']); // just e
    });

    test('should handle division operators', () => {
      expect(mathTokenize('10 / 2')).toEqual(['10', '/', '2']);
      expect(mathTokenize('10 // 2')).toEqual(['10', '//', '2']);
      expect(mathTokenize('10 ÷ 2')).toEqual(['10', '÷', '2']);
    });

    test('should handle multiplication operators', () => {
      expect(mathTokenize('2 * 3')).toEqual(['2', '*', '3']);
      expect(mathTokenize('2 ** 3')).toEqual(['2', '**', '3']);
      expect(mathTokenize('2 × 3')).toEqual(['2', '×', '3']);
    });
  });

  describe('error handling', () => {
    test('should throw on invalid character', () => {
      expect(() => mathTokenize('2 & 3')).toThrow('Invalid character: &');
      expect(() => mathTokenize('2 $ 3')).toThrow('Invalid character: $');
      expect(() => mathTokenize('2 @ 3')).toThrow('Invalid character: @');
      expect(() => mathTokenize('2 # 3')).toThrow('Invalid character: #');
    });

    test('should throw on invalid special characters', () => {
      expect(() => mathTokenize('[')).toThrow('Invalid character: [');
      expect(() => mathTokenize(']')).toThrow('Invalid character: ]');
      expect(() => mathTokenize('{')).toThrow('Invalid character: {');
      expect(() => mathTokenize('}')).toThrow('Invalid character: }');
    });

    test('should throw on invalid Unicode characters', () => {
      expect(() => mathTokenize('2 ∞ 3')).toThrow('Invalid character: ∞');
    });
  });

  describe('edge cases with scientific notation', () => {
    test('should handle sign in scientific notation', () => {
      expect(mathTokenize('1e+10')).toEqual(['1e+10']);
      expect(mathTokenize('1e-10')).toEqual(['1e-10']);
      expect(mathTokenize('2.5E+3')).toEqual(['2.5E+3']);
    });

    test('should not treat standalone e as scientific notation', () => {
      expect(mathTokenize('1e10')).toEqual(['1e10']); // scientific notation
      expect(mathTokenize('1 e 10')).toEqual(['1', 'e', '10']); // e as variable with spaces
      expect(mathTokenize('e + 1')).toEqual(['e', '+', '1']); // e as variable
      expect(mathTokenize('e')).toEqual(['e']); // just e
    });

    test('should handle number followed immediately by letter (not e)', () => {
      expect(mathTokenize('5x')).toEqual(['5', 'x']);
      expect(mathTokenize('10abc')).toEqual(['10', 'abc']);
      expect(mathTokenize('3.14pi')).toEqual(['3.14', 'pi']);
    });

    test('should handle E in scientific notation', () => {
      expect(mathTokenize('1E10')).toEqual(['1E10']);
      expect(mathTokenize('2.5E-3')).toEqual(['2.5E-3']);
    });
  });

  describe('complex real-world expressions', () => {
    test('should tokenize mathematical formulas', () => {
      expect(mathTokenize('π * r ^ 2')).toEqual(['π', '*', 'r', '^', '2']);
      expect(mathTokenize('2 * π * radius')).toEqual(['2', '*', 'π', '*', 'radius']);
    });

    test('should tokenize expressions with multiple operators', () => {
      expect(mathTokenize('(a + b) * (c - d)')).toEqual([
        '(',
        'a',
        '+',
        'b',
        ')',
        '*',
        '(',
        'c',
        '-',
        'd',
        ')',
      ]);
    });

    test('should tokenize floor division', () => {
      expect(mathTokenize('17 // 5')).toEqual(['17', '//', '5']);
    });

    test('should tokenize exponentiation', () => {
      expect(mathTokenize('2 ** 10')).toEqual(['2', '**', '10']);
      expect(mathTokenize('2 ^ 10')).toEqual(['2', '^', '10']);
    });
  });
});
