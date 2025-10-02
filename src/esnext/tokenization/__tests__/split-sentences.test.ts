import { splitSentences } from '../split-sentences.ts';

describe('splitSentences', () => {
  test('splits simple sentences by period', () => {
    const input = 'This is one. This is two. This is three.';
    expect(splitSentences(input)).toEqual(['This is one.', 'This is two.', 'This is three.']);
  });

  test('splits sentences by exclamation and question marks', () => {
    const input = 'Hello! How are you? Fine!';
    expect(splitSentences(input)).toEqual(['Hello!', 'How are you?', 'Fine!']);
  });

  test('handles ellipsis and triple period', () => {
    const input = 'Wait... What happened… Really?';
    expect(splitSentences(input)).toEqual(['Wait...', 'What happened…', 'Really?']);
  });

  test('handles sentences ending with quotes', () => {
    const input = `He said, "Hello." She replied, 'Hi!'`;
    expect(splitSentences(input)).toEqual([`He said, "Hello."`, `She replied, 'Hi!'`]);
  });

  test('handles multiple sentence-ending punctuation', () => {
    const input = 'What is this?! Are you sure?!';
    expect(splitSentences(input)).toEqual(['What is this?!', 'Are you sure?!']);
  });

  test('handles unicode sentence-ending punctuation', () => {
    const input = 'Really‼ That happened‽ No way⁇';
    expect(splitSentences(input)).toEqual(['Really‼', 'That happened‽', 'No way⁇']);
  });

  test('returns empty array for empty input', () => {
    expect(splitSentences('')).toEqual([]);
  });

  test('handles sentences with newlines', () => {
    const input = 'First sentence.\nSecond sentence!\n\nThird sentence?';
    expect(splitSentences(input)).toEqual([
      'First sentence.',
      'Second sentence!',
      'Third sentence?',
    ]);
  });

  test('handles sentences with colons', () => {
    const input = 'Title: Subtitle. Next sentence: Another one!';
    expect(splitSentences(input)).toEqual([
      'Title:',
      'Subtitle.',
      'Next sentence:',
      'Another one!',
    ]);
  });

  test('does not return empty or whitespace-only sentences', () => {
    const input = 'Hello!   \n   How are you?  ';
    expect(splitSentences(input)).toEqual(['Hello!', 'How are you?']);
  });

  test('handles sentences with right quotation marks', () => {
    const input = 'He said, “Yes.” She replied, ’No!’';
    expect(splitSentences(input)).toEqual(['He said, “Yes.”', 'She replied, ’No!’']);
  });
});
