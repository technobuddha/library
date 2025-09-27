/**
 * A simple priority queue
 * @group Utility
 * @category Classes
 */
export class PriorityQueue<T> {
  private comparator: (a: T, b: T) => number;
  private readonly contents: T[];
  private sorted: boolean;

  /**
   * Creates a new PriorityQueue.
   *
   * @param comparator - Function to compare two elements and puts them in priority order.  Takes two elements as arguments and returns a number greater, less
   * then or equal to zero.
   * @param contents - Initial contents of the queue
   */
  public constructor(comparator: (a: T, b: T) => number, contents?: Iterable<T>) {
    this.comparator = comparator;
    this.contents = Array.from<T>(contents ?? []);
    this.sorted = false;
  }

  private sort(): void {
    if (!this.sorted) {
      this.contents.sort(this.comparator);
    }
    this.sorted = true;
  }

  /**
   * Add an element to the queue
   * @param o - element to be added
   */
  public enqueue(...o: T[]): void {
    this.contents.push(...o);
    this.sorted = false;
  }

  /**
   * Return and remove the highest priority item from the queue
   *
   * @returns queue element
   */
  public dequeue(): T | undefined {
    this.sort();
    return this.contents.shift();
  }

  /**
   * Iterate through all elements in the queue
   *
   * @returns generator function
   */
  public *[Symbol.iterator](): Iterator<T> {
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
