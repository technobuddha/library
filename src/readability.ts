import { splitSentences } from './split-sentences.ts';
import { splitWords } from './split-words.ts';
import { syllables } from './syllables.ts';

/**
 * Calculates the Flesch-Kincaid readability score for a given text.
 *
 * The Flesch-Kincaid readability score estimates how easy a text is to read,
 * with higher scores indicating easier readability. The formula considers the
 * average number of words per sentence and the average number of syllables per word.
 *
 * | Score        | School Level       | Notes                                                                    |
 * | ------------ | ------------------ | ------------------------------------------------------------------------ |
 * | 100.00–90.00 | 5ᵗʰ grade          | Very easy to read. Easily understood by an average 11-year-old student.  |
 * | 90.0–80.0	  | 6ᵗʰ grade	         | Easy to read. Conversational English for consumers.                      |
 * | 80.0–70.0	  | 7ᵗʰ grade	         | Fairly easy to read.                                                     |
 * | 70.0–60.0	  | 8ᵗʰ & 9ᵗʰ grade	   | Plain English. Easily understood by 13-15 year-old students.             |
 * | 60.0–50.0	  | 10ᵗʰ to 12ᵗʰ grade | Fairly difficult to read.                                                |
 * | 50.0–30.0    | College            | Difficult to read.                                                       |
 * | 30.0–10.0    | College graduate   | Very difficult to read. Best understood by university graduates.         |
 * | 10.0–0.0     | Professional       | Extremely difficult to read. Best understood by university graduates.    |
 * @param text - The input text to analyze.
 * @returns The Flesch-Kincaid readability score as a number.
 * @see https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests
 * @group English
 * @category Analysis
 */
export function readability(text: string): number {
  const words = splitWords(text);
  const sentences = splitSentences(text);
  const totalSyllables = words.reduce((acc, value) => acc + syllables(value), 0);

  const numWords = words.length;
  const numSentences = sentences.length;

  return 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (totalSyllables / numWords);
}
