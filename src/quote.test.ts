import { quote } from './quote.ts';

describe('quote', () => {
  test('should quote input', () => {
    expect(quote('My favorite color is "blue."')).toBe('"My favorite color is \\"blue.\\""');
  });

  test('should allow to specify quote', () => {
    expect(quote('My favorite color is "blue."', { quote: "'" })).toBe(
      '\'My favorite color is \\"blue.\\"\'',
    );
  });

  test('should allow to specify escape', () => {
    expect(quote('My favorite color is "blue."', { escape: '""' })).toBe(
      '"My favorite color is ""blue."""',
    );
  });
});
