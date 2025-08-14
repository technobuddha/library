import { type Cartesian } from './@types/geometry.ts';

/**
 * Represents a map with keys of cartesian coordinates, optimized for efficient storage and lookup.
 *
 * `CartesianMap` provides map-like operations (get, set, has, etc)
 * for objects with `{ x, y }` properties, where `x` and `y` are numbers.
 *
 * Internally, values are stored in a nested `Map<number, Set<number>>` structure,
 * allowing for fast addition, deletion, and membership checks.
 *
 * Supports all standard map operations, as well as iteration and forEach.
 *
 * @group Geometry
 * @category Coordinates
 */
export class CartesianMap<V> implements Map<Cartesian, V> {
  private readonly xaxis: Map<number, Map<number, V>> = new Map();

  /**
   * Creates a new `CartesianSet` optionally initialized with an array of cartesian.
   *
   * @param cartesian - Optional array of cartesian to initialize the set.
   */
  public constructor(cartesian?: [Cartesian, V][] | null) {
    if (cartesian) {
      for (const [key, value] of cartesian) {
        this.set(key, value);
      }
    }
  }

  /**
   * Gets the number of unique cartesian in the set.
   */
  public get size(): number {
    let size = 0;
    for (const map of this.xaxis.values()) {
      size += map.size;
    }
    return size;
  }

  public readonly [Symbol.toStringTag] = 'CartesianMap';

  /**
   * Removes all cartesian from the set.
   */
  public clear(): void {
    this.xaxis.clear();
  }

  /**
   * Removes a coordinate from the map.
   *
   * @param value - The coordinate to remove.
   * @returns `true` if the coordinate was present and removed, `false` otherwise.
   */
  public delete(value: Cartesian): boolean {
    const { x, y } = value;
    const map = this.xaxis.get(x);
    if (map) {
      const deleted = map.delete(y);
      if (map.size === 0) {
        this.xaxis.delete(x);
      }
      return deleted;
    }
    return false;
  }

  /**
   * Returns an iterator over `[coordinate, value]` pairs for each coordinate in the map.
   *
   * @returns An iterator of `[Cartesian, *V*]` pairs.
   */
  public *entries(): MapIterator<[Cartesian, V]> {
    for (const [x, yaxis] of this.xaxis.entries()) {
      for (const [y, value] of yaxis.entries()) {
        yield [{ x, y }, value];
      }
    }
  }

  /**
   * Executes a provided function once for each coordinate in the set.
   *
   * @param callback - Function to execute for each coordinate.
   * @param thisArg - Value to use as `this` when executing `callback`.
   */
  public forEach(
    callback: (value: V, key: Cartesian, map: CartesianMap<V>) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, value] of this.entries()) {
      callback.call(thisArg, value, key, this);
    }
  }

  /**
   * Retrieves the value associated with the given Cartesian key.
   *
   * @param key - The Cartesian coordinate used to locate the value.
   * @returns The value of type `V` if found; otherwise, `undefined`.
   */
  public get(key: Cartesian): V | undefined {
    const yaxis = this.xaxis.get(key.x);
    return yaxis ? yaxis.get(key.y) : undefined;
  }

  /**
   * Returns an iterator over the cartesian in the set.
   *
   * @returns An iterator of `Cartesian`.
   */
  public *keys(): SetIterator<Cartesian> {
    for (const [x, yaxis] of this.xaxis.entries()) {
      for (const y of yaxis.keys()) {
        yield { x, y };
      }
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
   * Add or update a value in the map.
   *
   * @param value - A single coordinate or an array of cartesian to add.
   * @returns The set itself, for chaining.
   */
  public set(key: Cartesian, value: V): this {
    if (!this.xaxis.has(key.x)) {
      this.xaxis.set(key.x, new Map());
    }
    this.xaxis.get(key.x)!.set(key.y, value);
    return this;
  }

  /**
   * Returns an iterator over the cartesian in the set.
   *
   * @returns An iterator of `Cartesian`.
   */
  public *values(): MapIterator<V> {
    for (const yaxis of this.xaxis.values()) {
      yield* yaxis.values();
    }
  }

  /**
   * Returns an iterator over the cartesian in the set.
   *
   * @returns An iterator of `Cartesian`.
   */
  public [Symbol.iterator](): MapIterator<[Cartesian, V]> {
    return this.entries();
  }
}
