import { loremIpsumData, type LoremIpsumVersions } from '../@data/lorem-ipsum.ts';
import { empty, space } from '../unicode/unicode.ts';

import { type RandomProperties } from './random.ts';
import { randomInteger } from './random-integer.ts';

/**
 * Defines the length category for generated paragraphs.
 *
 * @group Random
 * @category Text Generation
 */
export type ParagraphSize = 'short' | 'middle' | 'long';

/**
 * Configuration options for lorem ipsum text generation.
 * @group Random
 * @category Text Generation
 */
export type LoremIpsumOptions = {
  /** Number of paragraphs to generate */
  paragraphs?: number;
  /** Size category determining sentence count per paragraph */
  size?: ParagraphSize;
  /** Whether to preserve the first 5 words for consistency */
  preserveFirstWords?: boolean;
  /** Source text collection to use for word generation */
  source?: LoremIpsumVersions;
};

/**
 * Generates lorem ipsum placeholder text with customizable options.
 *
 * This function creates pseudo-Latin placeholder text commonly used in publishing and
 * graphic design to demonstrate text layout without meaningful content distracting
 * from the design itself.
 *
 * The generator supports multiple paragraph sizes:
 * - Short: 2-8 sentences per paragraph
 * - Middle: 3-20 sentences per paragraph
 * - Long: 6-40 sentences per paragraph
 *
 * Each sentence contains 2-12 words randomly selected from the chosen source text.
 * When `preserveFirstWords` is enabled, the first sentence of the first paragraph
 * will always begin with the same 5 words for consistency across generations.
 *
 * @param options - Configuration object for text generation
 * @param randomOptions - Optional configuration for random number generation
 * @returns Generated lorem ipsum text with paragraphs separated by newlines
 *
 * @example
 * ```typescript
 * // Generate single paragraph with default settings
 * const text = loremIpsum();
 * // "Lorem ipsum dolor sit amet..."
 *
 * // Generate multiple paragraphs
 * const multiParagraph = loremIpsum({ paragraphs: 3 });
 *
 * // Generate short paragraphs with preserved first words
 * const consistent = loremIpsum({
 *   paragraphs: 2,
 *   size: 'short',
 *   preserveFirstWords: true
 * });
 *
 * // Use different source text
 * const raven = loremIpsum({
 *   source: 'theRaven',
 *   paragraphs: 1
 * });
 * ```
 *
 * @group Random
 * @category Text Generation
 */
export function loremIpsum(
  {
    paragraphs = 1,
    size = 'middle',
    preserveFirstWords = false,
    source = 'lorem-ipsum',
  }: LoremIpsumOptions = {},
  { random = Math.random }: RandomProperties = {},
): string {
  const ipsum = loremIpsumData[source];
  let lorem = empty;

  for (let i = 0; i < paragraphs; i++) {
    let sentences = 0;
    switch (size) {
      case 'short': {
        sentences = randomInteger(2, 8, { random });
        break;
      }
      case 'middle': {
        sentences = randomInteger(3, 20, { random });
        break;
      }
      case 'long': {
        sentences = randomInteger(6, 40);
        break;
      }
      // no default
    }

    if (i !== 0) {
      lorem += '\n';
    }
    for (let j = 0; j < sentences; j++) {
      const words =
        preserveFirstWords && i === 0 && j === 0 ? randomInteger(6, 12) : randomInteger(2, 12);

      for (let k = 0; k < words; k++) {
        const index =
          preserveFirstWords && i === 0 && j === 0 && k < 5 ?
            k
          : randomInteger(0, ipsum.length - 1);

        if (k === 0) {
          if (j !== 0) {
            lorem += space + space;
          } // indent new sentence if not first sentence
          lorem += ipsum[index].slice(0, 1).toUpperCase();
          lorem += ipsum[index].slice(1);
        } else {
          lorem += space;
          lorem += ipsum[index];
        }
      }
      lorem += '.';
    }
  }

  return lorem;
}
