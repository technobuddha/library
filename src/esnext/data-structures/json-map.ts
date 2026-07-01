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

  /**
   * The string tag used when calling Object.prototype.toString on instances of this class.
   */
  public readonly [Symbol.toStringTag] = 'JSONMap';

  public constructor(values?: Iterable<[K, V]> | null) {
    if (values) {
      for (const [k, v] of values) {
        this.set(k, v);
      }
    }
  }

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
    for (const [key, value] of this.map) {
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
   * Retrieves the value associated with the given key, or inserts and returns the default value if the key is not found.
   * @param key - The key to look up
   * @param defaultValue - The value to insert if the key doesn't exist
   * @returns The value associated with the key (either existing or newly inserted)
   * @example
   * ```typescript
   * const map = new JSONMap<{ id: number }, string>();
   * map.getOrInsert({ id: 1 }, "default"); // "default" (inserted)
   * map.getOrInsert({ id: 1 }, "other");   // "default" (existing)
   * ```
   * @group Data Structures
   * @category Map
   */
  public getOrInsert(key: K, defaultValue: V): V {
    const serializedKey = jsonSerialize(key);

    if (this.map.getOrInsert) {
      return this.map.getOrInsert(serializedKey, defaultValue);
    }

    // TODO [engine:node@>25] - Nodejs is not supporting getOrInsert
    if (this.map.has(serializedKey)) {
      return this.map.get(serializedKey) as V;
    }
    this.map.set(serializedKey, defaultValue);
    return defaultValue;
  }

  /**
   * Retrieves the value associated with the given key, or computes, inserts, and returns a new value if the key is not found.
   * @param key - The key to look up
   * @param defaultValueFn - A function that computes the default value if the key doesn't exist
   * @returns The value associated with the key (either existing or newly computed)
   * @example
   * ```typescript
   * const map = new JSONMap<{ id: number }, string>();
   * map.getOrInsertComputed({ id: 1 }, (k) => `value-${k.id}`); // "value-1" (computed)
   * map.getOrInsertComputed({ id: 1 }, (k) => `other-${k.id}`); // "value-1" (existing)
   * ```
   * @group Data Structures
   * @category Map
   */
  public getOrInsertComputed(key: K, defaultValueFn: (key: K) => V): V {
    const serializedKey = jsonSerialize(key);
    if (this.map.getOrInsertComputed) {
      return this.map.getOrInsertComputed(serializedKey, (k) =>
        defaultValueFn(jsonDeserialize(k) as K),
      );
    }

    // TODO [engine:node@>25] - Nodejs is not supporting getOrInsertComputed
    if (this.map.has(serializedKey)) {
      return this.map.get(serializedKey)!;
    }
    const computedValue = defaultValueFn(key);
    this.map.set(serializedKey, computedValue);
    return computedValue;
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
