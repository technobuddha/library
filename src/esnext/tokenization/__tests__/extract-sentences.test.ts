import { extractSentences } from '../extract-sentences.ts';

describe('extractSentences', () => {
  test('splits simple sentences by period', () => {
    const input = 'This is one. This is two. This is three.';
    expect(extractSentences(input)).toEqual(['This is one.', 'This is two.', 'This is three.']);
  });

  test('splits sentences by exclamation and question marks', () => {
    const input = 'Hello! How are you? Fine!';
    expect(extractSentences(input)).toEqual(['Hello!', 'How are you?', 'Fine!']);
  });

  test('handles ellipsis and triple period', () => {
    const input = 'Wait... What happened… Really?';
    expect(extractSentences(input)).toEqual(['Wait...', 'What happened…', 'Really?']);
  });

  test('handles sentences ending with quotes', () => {
    const input = `He said, "Hello." She replied, 'Hi!'`;
    expect(extractSentences(input)).toEqual([`He said, "Hello."`, `She replied, 'Hi!'`]);
  });

  test('handles multiple sentence-ending punctuation', () => {
    const input = 'What is this?! Are you sure?!';
    expect(extractSentences(input)).toEqual(['What is this?!', 'Are you sure?!']);
  });

  test('handles unicode sentence-ending punctuation', () => {
    const input = 'Really‼ That happened‽ No way⁇';
    expect(extractSentences(input)).toEqual(['Really‼', 'That happened‽', 'No way⁇']);
  });

  test('returns empty array for empty input', () => {
    expect(extractSentences('')).toEqual([]);
  });

  test('handles sentences with newlines', () => {
    const input = 'First sentence.\nSecond sentence!\n\nThird sentence?';
    expect(extractSentences(input)).toEqual([
      'First sentence.',
      'Second sentence!',
      'Third sentence?',
    ]);
  });

  test('handles sentences with colons', () => {
    const input = 'Title: Subtitle. Next sentence: Another one!';
    expect(extractSentences(input)).toEqual([
      'Title:',
      'Subtitle.',
      'Next sentence:',
      'Another one!',
    ]);
  });

  test('does not return empty or whitespace-only sentences', () => {
    const input = 'Hello!   \n   How are you?  ';
    expect(extractSentences(input)).toEqual(['Hello!', 'How are you?']);
  });

  test('handles sentences with right quotation marks', () => {
    const input = 'He said, “Yes.” She replied, ’No!’';
    expect(extractSentences(input)).toEqual(['He said, “Yes.”', 'She replied, ’No!’']);
  });
});
