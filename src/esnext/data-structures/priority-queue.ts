import { type List } from '../array/list.ts';
import { toArray } from '../array/to-array.ts';
import { type Comparator } from '../comparison/comparator.ts';

/**
 * A simple priority queue implementation that maintains elements in sorted order based on a comparator function.
 * Elements are automatically sorted when accessed, ensuring efficient priority-based operations.
 *
 * @typeParam T - The type of elements stored in the queue
 *
 * @example
 * ```typescript
 * import { PriorityQueue } from './priority-queue.ts';
 * import { compareNumbers } from '../number/compare-numbers.ts';
 *
 * // Create a priority queue for numbers
 * const queue = new PriorityQueue<number>(compareNumbers);
 * queue.enqueue(3, 1, 4, 1, 5);
 * console.log(queue.dequeue()); // 1
 * console.log(queue.dequeue()); // 1
 * console.log(queue.peek());    // 3
 * ```
 *
 * @example
 * ```typescript
 * // Create a priority queue with initial contents
 * const queue = new PriorityQueue<number>(compareNumbers, [5, 2, 8, 1]);
 * console.log(queue.toArray()); // [1, 2, 5, 8]
 * ```
 *
 * @group Data Structures
 * @category Queue
 */
export class PriorityQueue<T> {
  private comparator: Comparator<T>;
  private readonly contents: T[];
  private sorted: boolean;

  /**
   * Creates a new PriorityQueue.
   *
   * @param comparator - Function to compare two elements and put them in priority order. Takes two elements as arguments and returns a number:
   *   - negative if `a` should come before `b`
   *   - positive if `b` should come before `a`
   *   - zero if they are equal priority
   * @param contents - Initial contents of the queue
   */
  public constructor(comparator: Comparator<T>, contents?: T | List<T>) {
    this.comparator = comparator;
    this.contents = contents ? toArray(contents) : [];
    this.sorted = false;
  }

  private sort(): void {
    if (!this.sorted) {
      this.contents.sort(this.comparator);
    }
    this.sorted = true;
  }

  /**
   * Add one or more elements to the queue
   *
   * @param o - Elements to be added to the queue
   */
  public enqueue(...o: T[]): void {
    this.contents.push(...o);
    this.sorted = false;
  }

  /**
   * Return and remove the highest priority item from the queue
   *
   * @returns The highest priority element, or undefined if the queue is empty
   */
  public dequeue(): T | undefined {
    this.sort();
    return this.contents.shift();
  }

  /**
   * Return the highest priority item from the queue without removing it
   *
   * @returns The highest priority element, or undefined if the queue is empty
   */
  public peek(): T | undefined {
    this.sort();
    return this.contents[0];
  }

  /**
   * Remove all elements from the queue
   */
  public clear(): void {
    this.contents.length = 0;
    this.sorted = true;
  }

  /**
   * Convert the queue to an array in priority order
   *
   * @returns Array containing all elements in priority order
   */
  public toArray(): T[] {
    this.sort();
    return Array.from(this.contents);
  }

  /**
   * Iterate through all elements in the queue
   *
   * @returns generator function
   */
  public *[Symbol.iterator](): Generator<T> {
    this.sort();
    yield* this.contents;
  }

  /**
   * Determine the number of items in the queue
   *
   * @returns number of element in the queue
   */
  public get size(): number {
    return this.contents.length;
  }

  /**
   * Transform all elements in the queue
   *
   * @param f - Function to transform each element of the queue
   * @returns array of transformed queue elements
   */
  public map<S>(f: (value: T, index: number, array: T[]) => S): S[] {
    this.sort();
    return this.contents.map(f);
  }

  /**
   * Change the function used to order the queue
   *
   * @param newComparator - function to compare elements of the queue
   */
  public reorder(newComparator: (a: T, b: T) => number): void {
    this.comparator = newComparator;
    this.sorted = false;
  }
}
