import { readability } from '../readability.ts';

describe('readability', () => {
  test('returns high score for very simple text', () => {
    const text = 'See Spot run. Run, Spot, run!';
    expect(readability(text)).toBeCloseTo(139.325);
  });

  test('returns lower score for complex text', () => {
    const text =
      'The philosophical implications of quantum mechanics are profound, challenging our understanding of reality itself.';
    expect(readability(text)).toBeCloseTo(-0.15);
  });

  test('returns middle score for simple text', () => {
    const text = 'This is a sentence. Here is another one.';
    expect(readability(text)).toBeCloseTo(86.45);
  });

  test('handles single sentence', () => {
    const text = 'The quick brown fox jumps over the lazy dog.';
    expect(readability(text)).toBeCloseTo(94.3);
  });

  test('handles single word', () => {
    const text = 'Hello';
    expect(readability(text)).toBeCloseTo(36.62);
  });

  test('handles empty string', () => {
    const text = '';
    expect(readability(text)).toBeNaN();
  });

  test('handles text with no punctuation', () => {
    const text = 'This is a test with no punctuation and several words';
    expect(readability(text)).toBeCloseTo(69.785);
  });

  test('handles text with many short sentences', () => {
    const text = 'Go. Stop. Run. Jump. Eat. Sleep.';
    expect(readability(text)).toBeCloseTo(121.22);
  });

  test('handles text with long sentences', () => {
    const text =
      'Despite the rain, the children, who had been waiting all week for the festival, decided to go outside and enjoy the festivities, which included games, food, and music.';
    expect(readability(text)).toBeCloseTo(60.35);
  });
});
