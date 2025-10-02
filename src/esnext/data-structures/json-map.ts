import { type JSONValue } from '../serialization/json.ts';

import { jsonDeserialize } from './json-deserialize.ts';
import { jsonSerialize } from './json-serialize.ts';

/**
 * A `Map` that allows serializable objects keys.
 *
 * `JSONMap` serializes keys using JSON.serialize, enabling the use of complex objects as map keys,
 * similar to how `Map` allows objects, but with value-based equality rather than reference-based.
 * @typeParam K - The type of the key, which must extend `JSONValue`.
 * @typeParam V - The type of the value.
 * @example
 * ```typescript
 * const map = new JSONMap<{ id: number }, string>();
 * map.set({ id: 1 }, "one");
 * map.get({ id: 1 }); // "one"
 * ```
 * @remarks
 * - Keys are serialized using JSON, so only JSON-safe objects should be used as keys.
 * - Key equality is determined by the serialized JSON string, not by object reference.
 * - Circular references in keys are not supported.
 * @group Data Structures
 * @category Map
 */
export class JSONMap<K extends JSONValue, V> implements Map<K, V> {
  protected map = new Map<string, V>();

  public constructor(values?: Iterable<[K, V]> | null) {
    if (values) {
      for (const [k, v] of values) {
        this.set(k, v);
      }
    }
  }

  /**
   * The string tag used when calling Object.prototype.toString on instances of this class.
   */
  public readonly [Symbol.toStringTag] = 'JSONMap';

  /**
   * Returns the number of elements in the map.
   */
  public get size(): number {
    return this.map.size;
  }

  /**
   * Removes all key-value pairs from the map.
   */
  public clear(): void {
    this.map.clear();
  }

  /**
   * Deletes the entry associated with the given key from the map.
   */
  public delete(value: K): boolean {
    return this.map.delete(jsonSerialize(value));
  }

  /**
   * Returns an iterator over the deserialized key-value pairs in the map.
   */
  public *entries(): MapIterator<[K, V]> {
    for (const [key, value] of this.map.entries()) {
      yield [jsonDeserialize(key) as K, value];
    }
  }

  /**
   * Executes a provided function once for each key-value pair in the JSONMap.
   */
  public forEach(
    callback: (value: V, key: K, map: JSONMap<K, V>) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, value] of this.entries()) {
      callback.call(thisArg, value, key, this);
    }
  }

  /**
   * Retrieves the value associated with the given key, or undefined if the key is not found.
   */
  public get(key: K): V | undefined {
    return this.map.get(jsonSerialize(key));
  }

  /**
   * Determines whether the specified key exists in the map.
   */
  public has(value: K): boolean {
    return this.map.has(jsonSerialize(value));
  }

  /**
   * Returns an iterator over the deserialized keys of the map.
   */
  public *keys(): MapIterator<K> {
    for (const key of this.map.keys()) {
      yield jsonDeserialize(key) as K;
    }
  }

  /**
   * Sets the value for the specified key in the map.
   */
  public set(key: K, value: V): this {
    this.map.set(jsonSerialize(key), value);
    return this;
  }

  /**
   * Returns an iterator over the values in the map.
   */
  public *values(): MapIterator<V> {
    yield* this.map.values();
  }

  /**
   * Returns an iterator over the key-value pairs in the map.
   */
  public [Symbol.iterator](): MapIterator<[K, V]> {
    return this.entries();
  }
}
