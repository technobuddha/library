import { type JsonObject } from 'type-fest';

import { deserialize, serialize } from './json-serializer.ts';

/**
 * A {@link Map} that allows serializable objects keys.
 *
 * `JSONMap` serializes keys using JSON.serialize, enabling the use of complex objects as map keys,
 * similar to how `Map` allows objects, but with value-based equality rather than reference-based.
 * @typeParam K - The type of the key, which must extend `JsonObject`.
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
 * @group JSON
 * @category Data Structures
 */
export class JSONMap<K extends JsonObject, V> implements Map<K, V> {
  protected map = new Map<string, V>();

  public constructor(values?: Iterable<[K, V]> | null) {
    if (values) {
      for (const [k, v] of values) {
        this.set(k, v);
      }
    }
  }

  public readonly [Symbol.toStringTag] = 'JSONMap';

  public get size(): number {
    return this.map.size;
  }

  public clear(): void {
    this.map.clear();
  }

  public delete(value: K): boolean {
    return this.map.delete(serialize(value));
  }

  public *entries(): MapIterator<[K, V]> {
    for (const [key, value] of this.map.entries()) {
      yield [deserialize(key) as K, value];
    }
  }

  public forEach(
    callback: (value: V, key: K, map: JSONMap<K, V>) => void,
    thisArg?: unknown,
  ): void {
    for (const [key, value] of this.entries()) {
      callback.call(thisArg, value, key, this);
    }
  }

  public get(key: K): V | undefined {
    return this.map.get(serialize(key));
  }

  public has(value: K): boolean {
    return this.map.has(serialize(value));
  }

  public *keys(): MapIterator<K> {
    for (const key of this.map.keys()) {
      yield deserialize(key) as K;
    }
  }

  public set(key: K, value: V): this {
    this.map.set(serialize(key), value);
    return this;
  }

  public *values(): MapIterator<V> {
    yield* this.map.values();
  }

  public [Symbol.iterator](): MapIterator<[K, V]> {
    return this.entries();
  }
}
