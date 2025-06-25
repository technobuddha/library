import { type Cartesian } from './geometry.ts';

/**
 * Represents a set of 2D cartesian, optimized for efficient storage and lookup.
 *
 * `CartesianSet` provides set-like operations (union, intersection, difference, etc.)
 * for objects with `{ x, y }` properties, where `x` and `y` are numbers.
 *
 * Internally, cartesian are stored in a nested `Map<number, Set<number>>` structure,
 * allowing for fast addition, deletion, and membership checks.
 *
 * Example usage:
 * ```typescript
 * const set = new CartesianSet([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
 * set.add({ x: 5, y: 6 });
 * set.has({ x: 1, y: 2 }); // true
 * ```
 *
 * Supports all standard set operations, as well as iteration and forEach.
 *
 * @group Geometry
 * @category Coordinates
 */
export class CartesianSet implements ReadonlySetLike<Cartesian> {
  private readonly xaxis: Map<number, Set<number>> = new Map();

  /**
   * Creates a new `CartesianSet` optionally initialized with an array of cartesian.
   *
   * @param cartesian - Optional array of cartesian to initialize the set.
   */
  public constructor(cartesian?: Cartesian[] | null) {
    if (cartesian) {
      for (const { x, y } of cartesian) {
        this.add({ x, y });
      }
    }
  }

  /**
   * Gets the number of unique cartesian in the set.
   */
  public get size(): number {
    let size = 0;
    for (const set of this.xaxis.values()) {
      size += set.size;
    }
    return size;
  }

  public readonly [Symbol.toStringTag] = 'CartesianSet';

  /**
   * Adds one or more cartesian to the set.
   *
   * @param value - A single coordinate or an array of cartesian to add.
   * @returns The set itself, for chaining.
   */
  public add(value: Cartesian | Cartesian[]): this {
    const cartesian = Array.isArray(value) ? value : [value];

    for (const { x, y } of cartesian) {
      if (!this.xaxis.has(x)) {
        this.xaxis.set(x, new Set());
      }
      this.xaxis.get(x)!.add(y);
    }
    return this;
  }

  /**
   * Removes all cartesian from the set.
   */
  public clear(): void {
    this.xaxis.clear();
  }

  /**
   * Removes a coordinate from the set.
   *
   * @param value - The coordinate to remove.
   * @returns `true` if the coordinate was present and removed, `false` otherwise.
   */
  public delete(value: Cartesian): boolean {
    const { x, y } = value;
    const set = this.xaxis.get(x);
    if (set) {
      const deleted = set.delete(y);
      if (set.size === 0) {
        this.xaxis.delete(x);
      }
      return deleted;
    }
    return false;
  }

  /**
   * Returns a new set containing the cartesian present in this set but not in the other set.
   *
   * @param other - The set to compare against.
   * @returns A new `CartesianSet` with the difference.
   */
  public difference(other: CartesianSet): CartesianSet {
    const result = new CartesianSet();
    for (const value of this.values()) {
      if (!other.has(value)) {
        result.add(value);
      }
    }
    return result;
  }

  /**
   * Returns an iterator over `[coordinate, coordinate]` pairs for each coordinate in the set.
   *
   * @returns An iterator of `[Cartesian, Cartesian]` pairs.
   */
  public *entries(): SetIterator<[Cartesian, Cartesian]> {
    for (const value of this.values()) {
      yield [value, value];
    }
  }

  /**
   * Executes a provided function once for each coordinate in the set.
   *
   * @param callback - Function to execute for each coordinate.
   * @param thisArg - Value to use as `this` when executing `callback`.
   */
  public forEach(
    callback: (value: Cartesian, key: Cartesian, set: CartesianSet) => void,
    thisArg?: this,
  ): void {
    for (const value of this.values()) {
      callback.call(thisArg, value, value, this);
    }
  }

  /**
   * Checks if a coordinate is present in the set.
   *
   * @param coordinate - The coordinate to check.
   * @returns `true` if the coordinate exists in the set, `false` otherwise.
   */
  public has({ x, y }: Cartesian): boolean {
    const yaxis = this.xaxis.get(x);
    return yaxis ? yaxis.has(y) : false;
  }

  /**
   * Returns a new set containing only the cartesian present in both this set and the other set.
   *
   * @param other - The set to intersect with.
   * @returns A new `CartesianSet` with the intersection.
   */
  public intersection(other: CartesianSet): CartesianSet {
    const result = new CartesianSet();
    for (const coordinate of this.values()) {
      if (other.has(coordinate)) {
        result.add(coordinate);
      }
    }
    return result;
  }

  /**
   * Checks if this set and the other set have no cartesian in common.
   *
   * @param other - The set to compare against.
   * @returns `true` if the sets are disjoint, `false` otherwise.
   */
  public isDisjointFrom(other: CartesianSet): boolean {
    for (const coordinate of this.values()) {
      if (other.has(coordinate)) {
        return false; // Found a common coordinate
      }
    }
    return true;
  }

  /**
   * Checks if this set is a subset of another set.
   *
   * @param other - The set to compare against.
   * @returns `true` if every coordinate in this set is also in the other set.
   */
  public isSubsetOf(other: CartesianSet): boolean {
    for (const coordinate of this.values()) {
      if (!other.has(coordinate)) {
        return false; // Found a coordinate not in other
      }
    }
    return true; // All cartesian are in other
  }

  /**
   * Checks if this set is a superset of another set.
   *
   * @param other - The set to compare against.
   * @returns `true` if every coordinate in the other set is also in this set.
   */
  public isSupersetOf(other: CartesianSet): boolean {
    for (const coordinate of other.values()) {
      if (!this.has(coordinate)) {
        return false; // Found a coordinate in other not in this
      }
    }
    return true; // All cartesian in other are also in this
  }

  /**
   * Returns an iterator over the cartesian in the set.
   *
   * @returns An iterator of `Cartesian`.
   */
  public *keys(): SetIterator<Cartesian> {
    yield* this.values();
  }

  /**
   * Returns a new set containing cartesian that are in either this set or the other set, but not both.
   *
   * @param other - The set to compare against.
   * @returns A new `CartesianSet` with the symmetric difference.
   */
  public symmetricDifference(other: CartesianSet): CartesianSet {
    const result = new CartesianSet();

    for (const coordinate of this.values()) {
      if (!other.has(coordinate)) {
        result.add(coordinate);
      }
    }

    for (const coordinate of other.values()) {
      if (!this.has(coordinate)) {
        result.add(coordinate);
      }
    }

    return result;
  }

  /**
   * Returns a new set containing all cartesian from both this set and the other set.
   *
   * @param other - The set to unite with.
   * @returns A new `CartesianSet` with the union.
   */
  public union(other: CartesianSet): CartesianSet {
    const result = new CartesianSet();
    for (const coordinate of this.values()) {
      result.add(coordinate);
    }
    for (const coordinate of other.values()) {
      result.add(coordinate);
    }
    return result;
  }

  /**
   * Returns an iterator over the cartesian in the set.
   *
   * @returns An iterator of `Cartesian`.
   */
  public *values(): SetIterator<Cartesian> {
    for (const [x, yaxis] of this.xaxis.entries()) {
      for (const y of yaxis) {
        yield { x, y };
      }
    }
  }

  /**
   * Returns an iterator over the cartesian in the set.
   *
   * @returns An iterator of `Cartesian`.
   */
  public [Symbol.iterator](): SetIterator<Cartesian> {
    return this.values();
  }
}
