import { type JsonObject } from 'type-fest';

import { deserialize, serialize } from './json-serializer.ts';

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

  protected replicate<X = K>(values?: Iterable<X> | null): Set<X> {
    const Maker = this.constructor as new (values?: Iterable<X> | null) => Set<X>;
    return new Maker(values);
  }

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
