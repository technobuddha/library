import { randomChance } from './random-chance.ts';
import { randomDraw } from './random-draw.ts';
import { randomIndex } from './random-index.ts';
import { randomInteger } from './random-integer.ts';
import { randomPick } from './random-pick.ts';
import { randomSample } from './random-sample.ts';
import { randomShuffle } from './random-shuffle.ts';
import { randomWeightedPick } from './random-weighted-pick.ts';
import { type Weighted } from './weighted.ts';

/**
 * Configuration properties for the Random class.
 *
 * @group Random
 * @category Representation
 */
export type RandomProperties = {
  /** Custom random number generator function (defaults to Math.random) */
  random?: () => number;
};

/**
 * Abstract base class providing random number generation utilities.
 *
 * Provides a collection of methods for random operations including picking items from arrays,
 * shuffling arrays, generating random numbers, and probability-based decisions. Allows for
 * custom random number generators to be injected for testing or specialized use cases.
 *
 * @group Random
 * @category Representation
 */
export abstract class Random {
  /** The random number generator function used by all random operations */
  public readonly random: () => number;

  /**
   * Creates a new Random instance.
   *
   * @param options - Configuration options for the random generator
   */
  public constructor({ random = Math.random }: RandomProperties = {}) {
    this.random = random;
  }

  /**
   * Randomly picks an item from an array.
   *
   * @param list - Array to pick from
   * @returns A randomly selected item, or undefined if the array is empty
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * random.randomPick(['a', 'b', 'c']); // returns 'a', 'b', or 'c'
   * random.randomPick([]); // returns undefined
   * ```
   */
  public randomPick<T>(list: T[]): ReturnType<typeof randomPick<T>> {
    return randomPick(list, { random: this.random });
  }

  /**
   * Randomly draws (removes) an item from an array.
   *
   * @param list - Array to draw from
   * @returns An object containing the drawn item and the remaining array, or undefined if empty
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * const result = random.randomDraw(['a', 'b', 'c']);
   * // result might be { draw: 'b', list: ['a', 'c'] }
   * ```
   */
  public randomDraw<T>(list: T[]): ReturnType<typeof randomDraw<T>> {
    return randomDraw(list, { random: this.random });
  }

  /**
   * Randomly picks an item from a weighted array.
   *
   * Items with higher weight values have a greater chance of being selected.
   *
   * @param list - Array of items with weight properties
   * @returns A randomly selected weighted item, or undefined if the array is empty
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * const items = [
   *   { name: 'common', weight: 10 },
   *   { name: 'rare', weight: 1 }
   * ];
   * random.randomWeightedPick(items); // 'common' is 10x more likely
   * ```
   */
  public randomWeightedPick<T extends Weighted>(
    list: T[],
  ): ReturnType<typeof randomWeightedPick<T>> {
    return randomWeightedPick(list, { random: this.random });
  }

  /**
   * Randomly shuffles an array using the Fisher-Yates algorithm.
   *
   * @param list - Array to shuffle
   * @returns A new shuffled array (original array is not modified)
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * random.randomShuffle([1, 2, 3, 4]); // returns shuffled array like [3, 1, 4, 2]
   * ```
   */
  public randomShuffle<T>(list: T[]): ReturnType<typeof randomShuffle<T>> {
    return randomShuffle(list, { random: this.random });
  }

  /**
   * Returns true based on the given probability.
   *
   * @param probability - Probability value between 0 and 1
   * @returns True if the random value is less than the probability
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * random.randomChance(0.5); // 50% chance of returning true
   * random.randomChance(0.1); // 10% chance of returning true
   * ```
   */
  public randomChance(probability: number): boolean {
    return randomChance(probability, { random: this.random });
  }

  /**
   * Generates a random integer within a specified range.
   *
   * @param max - Maximum value (exclusive)
   * @param min - Minimum value (inclusive, defaults to 0)
   * @returns A random integer between min (inclusive) and max (exclusive)
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * random.randomNumber(10); // returns 0-9
   * random.randomNumber(10, 5); // returns 5-9
   * ```
   */
  public randomInteger(min: number, max: number): number {
    return randomInteger(min, max, { random: this.random });
  }

  /**
   * Returns a random valid index from an array.
   *
   * @param list - Array to get a random index for
   * @returns A random valid index for the array, or undefined if the array is empty
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * const items = ['a', 'b', 'c'];
   * random.randomIndex(items); // returns 0, 1, or 2
   * random.randomIndex([]); // returns undefined
   * ```
   */
  public randomIndex(list: unknown[]): number | undefined {
    return randomIndex(list, { random: this.random });
  }

  /**
   * Randomly samples (draws) multiple items from an array without replacement.
   *
   * Removes the sampled items from the array and returns both the sample and the remaining items.
   * If the sample size exceeds the array length, all items are sampled.
   *
   * @param list - Array to sample from
   * @param sampleSize - Number of items to sample
   * @returns Object containing the sampled items array and the remaining items array
   *
   * @example
   * ```typescript
   * const random = new MyRandom();
   * const deck = ['A', 'B', 'C', 'D', 'E'];
   * const result = random.randomSample(deck, 3);
   * // result might be { draw: ['C', 'A', 'E'], list: ['B', 'D'] }
   * ```
   *
   * @example
   * ```typescript
   * // Sampling more items than available
   * const random = new MyRandom();
   * const items = [1, 2, 3];
   * const result = random.randomSample(items, 10);
   * // result.draw contains all 3 items, result.list is empty
   * ```
   */
  public randomSample<T>(
    list: T[],
    sampleSize: number,
  ): {
    /** The items that were randomly drawn from the list */
    draw: T[];
    /** The list with the drawn item removed */
    list: T[];
  } {
    return randomSample(list, sampleSize, { random: this.random });
  }
}
