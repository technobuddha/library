<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / JSONMap

# Class: JSONMap\<K, V\>

Defined in: [json-map.ts:29](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L29)

A Map-like data structure that allows objects conforming to `JsonObject` as keys.

`JSONMap` serializes keys using JSON, enabling the use of complex objects as map keys,
similar to how `Map` allows objects, but with value-based equality rather than reference-based.

## Example

```typescript
const map = new JSONMap<{ id: number }, string>();
map.set({ id: 1 }, "one");
console.log(map.get({ id: 1 })); // "one"
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

> **new JSONMap**\<`K`, `V`\>(`values?`: `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<\[`K`, `V`\], `any`, `any`\>): `JSONMap`\<`K`, `V`\>

Defined in: [json-map.ts:32](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L32)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values?` | `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<\[`K`, `V`\], `any`, `any`\> |

#### Returns

`JSONMap`\<`K`, `V`\>

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `"JSONMap"` | `'JSONMap'` | [json-map.ts:40](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L40) |
| <a id="map"></a> `map` | `protected` | [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, `V`\> | `undefined` | [json-map.ts:30](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L30) |

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [json-map.ts:42](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L42)

##### Returns

`number`

the number of elements in the Map.

#### Implementation of

`Map.size`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`K`, `V`\]\>

Defined in: [json-map.ts:92](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L92)

#### Returns

`MapIterator`\<\[`K`, `V`\]\>

#### Implementation of

`Map.[iterator]`

***

### clear()

> **clear**(): `void`

Defined in: [json-map.ts:46](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L46)

#### Returns

`void`

#### Implementation of

`Map.clear`

***

### delete()

> **delete**(`value`: `K`): `boolean`

Defined in: [json-map.ts:50](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L50)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `K` |

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Implementation of

`Map.delete`

***

### entries()

> **entries**(): `MapIterator`\<\[`K`, `V`\]\>

Defined in: [json-map.ts:54](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L54)

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`K`, `V`\]\>

#### Implementation of

`Map.entries`

***

### forEach()

> **forEach**(`callback`: (`value`: `V`, `key`: `K`, `map`: `JSONMap`\<`K`, `V`\>) => `void`, `thisArg?`: `unknown`): `void`

Defined in: [json-map.ts:60](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L60)

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`value`: `V`, `key`: `K`, `map`: `JSONMap`\<`K`, `V`\>) => `void` |
| `thisArg?` | `unknown` |

#### Returns

`void`

#### Implementation of

`Map.forEach`

***

### get()

> **get**(`key`: `K`): `undefined` \| `V`

Defined in: [json-map.ts:69](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L69)

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `K` |

#### Returns

`undefined` \| `V`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Implementation of

`Map.get`

***

### has()

> **has**(`value`: `K`): `boolean`

Defined in: [json-map.ts:73](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L73)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `K` |

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Implementation of

`Map.has`

***

### keys()

> **keys**(): `MapIterator`\<`K`\>

Defined in: [json-map.ts:77](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L77)

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`K`\>

#### Implementation of

`Map.keys`

***

### set()

> **set**(`key`: `K`, `value`: `V`): `this`

Defined in: [json-map.ts:83](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L83)

Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `K` |
| `value` | `V` |

#### Returns

`this`

#### Implementation of

`Map.set`

***

### values()

> **values**(): `MapIterator`\<`V`\>

Defined in: [json-map.ts:88](https://github.com/technobuddha/library/blob/main/src/json-map.ts#L88)

Returns an iterable of values in the map

#### Returns

`MapIterator`\<`V`\>

#### Implementation of

`Map.values`
