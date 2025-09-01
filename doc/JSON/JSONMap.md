[@technobuddha/library](../modules.md) / JSONMap

# Class: JSONMap\<K, V\>

Defined in: [src/json-map.ts:25](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L25)

A [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) that allows serializable objects keys.

`JSONMap` serializes keys using JSON.serialize, enabling the use of complex objects as map keys,
similar to how `Map` allows objects, but with value-based equality rather than reference-based.

## Example

```typescript
const map = new JSONMap<{ id: number }, string>();
map.set({ id: 1 }, "one");
map.get({ id: 1 }); // "one"
```

## Remarks

- Keys are serialized using JSON, so only JSON-safe objects should be used as keys.
- Key equality is determined by the serialized JSON string, not by object reference.
- Circular references in keys are not supported.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `K` *extends* `JsonObject` | The type of the key, which must extend `JsonObject`. |
| `V` | The type of the value. |

## Implements

- [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`K`, `V`\>

## Constructors

### Constructor

```ts
new JSONMap<K, V>(values?: 
  | null
| Iterable<[K, V], any, any>): JSONMap<K, V>;
```

Defined in: [src/json-map.ts:28](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L28)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values?` | \| `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<\[`K`, `V`\], `any`, `any`\> |

#### Returns

`JSONMap`\<`K`, `V`\>

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `"JSONMap"` | `'JSONMap'` | The string tag used when calling Object.prototype.toString on instances of this class. | [src/json-map.ts:39](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L39) |

## Accessors

### size

#### Get Signature

```ts
get size(): number;
```

Defined in: [src/json-map.ts:44](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L44)

Returns the number of elements in the map.

##### Returns

`number`

#### Implementation of

```ts
Map.size
```

## Methods

### \[iterator\]()

```ts
iterator: MapIterator<[K, V]>;
```

Defined in: [src/json-map.ts:124](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L124)

Returns an iterator over the key-value pairs in the map.

#### Returns

`MapIterator`\<\[`K`, `V`\]\>

#### Implementation of

```ts
Map.[iterator]
```

***

### clear()

```ts
clear(): void;
```

Defined in: [src/json-map.ts:51](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L51)

Removes all key-value pairs from the map.

#### Returns

`void`

#### Implementation of

```ts
Map.clear
```

***

### delete()

```ts
delete(value: K): boolean;
```

Defined in: [src/json-map.ts:58](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L58)

Deletes the entry associated with the given key from the map.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `K` |

#### Returns

`boolean`

#### Implementation of

```ts
Map.delete
```

***

### entries()

```ts
entries(): MapIterator<[K, V]>;
```

Defined in: [src/json-map.ts:65](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L65)

Returns an iterator over the deserialized key-value pairs in the map.

#### Returns

`MapIterator`\<\[`K`, `V`\]\>

#### Implementation of

```ts
Map.entries
```

***

### forEach()

```ts
forEach(callback: (value: V, key: K, map: JSONMap<K, V>) => void, thisArg?: unknown): void;
```

Defined in: [src/json-map.ts:74](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L74)

Executes a provided function once for each key-value pair in the JSONMap.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`value`: `V`, `key`: `K`, `map`: `JSONMap`\<`K`, `V`\>) => `void` |
| `thisArg?` | `unknown` |

#### Returns

`void`

#### Implementation of

```ts
Map.forEach
```

***

### get()

```ts
get(key: K): undefined | V;
```

Defined in: [src/json-map.ts:86](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L86)

Retrieves the value associated with the given key, or undefined if the key is not found.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `K` |

#### Returns

`undefined` \| `V`

#### Implementation of

```ts
Map.get
```

***

### has()

```ts
has(value: K): boolean;
```

Defined in: [src/json-map.ts:93](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L93)

Determines whether the specified key exists in the map.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `K` |

#### Returns

`boolean`

#### Implementation of

```ts
Map.has
```

***

### keys()

```ts
keys(): MapIterator<K>;
```

Defined in: [src/json-map.ts:100](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L100)

Returns an iterator over the deserialized keys of the map.

#### Returns

`MapIterator`\<`K`\>

#### Implementation of

```ts
Map.keys
```

***

### set()

```ts
set(key: K, value: V): this;
```

Defined in: [src/json-map.ts:109](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L109)

Sets the value for the specified key in the map.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `K` |
| `value` | `V` |

#### Returns

`this`

#### Implementation of

```ts
Map.set
```

***

### values()

```ts
values(): MapIterator<V>;
```

Defined in: [src/json-map.ts:117](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L117)

Returns an iterator over the values in the map.

#### Returns

`MapIterator`\<`V`\>

#### Implementation of

```ts
Map.values
```
