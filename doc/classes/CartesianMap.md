<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / CartesianMap

# Class: CartesianMap\<V\>

Defined in: [cartesian-map.ts:17](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L17)

Represents a map with keys of cartesian coordinates, optimized for efficient storage and lookup.

`CartesianMap` provides map-like operations (get, set, has, etc)
for objects with `{ x, y }` properties, where `x` and `y` are numbers.

Internally, values are stored in a nested `Map<number, Set<number>>` structure,
allowing for fast addition, deletion, and membership checks.

Supports all standard map operations, as well as iteration and forEach.

## Type Parameters

| Type Parameter |
| ------ |
| `V` |

## Implements

- [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<[`Cartesian`](../type-aliases/Cartesian.md), `V`\>

## Constructors

### Constructor

> **new CartesianMap**\<`V`\>(`cartesian?`: `null` \| \[[`Cartesian`](../type-aliases/Cartesian.md), `V`\][]): `CartesianMap`\<`V`\>

Defined in: [cartesian-map.ts:25](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L25)

Creates a new `CartesianSet` optionally initialized with an array of cartesian.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cartesian?` | `null` \| \[[`Cartesian`](../type-aliases/Cartesian.md), `V`\][] | Optional array of cartesian to initialize the set. |

#### Returns

`CartesianMap`\<`V`\>

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `"CartesianMap"` | `'CartesianMap'` | [cartesian-map.ts:44](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L44) |

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [cartesian-map.ts:36](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L36)

Gets the number of unique cartesian in the set.

##### Returns

`number`

#### Implementation of

`Map.size`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[[`Cartesian`](../type-aliases/Cartesian.md), `V`\]\>

Defined in: [cartesian-map.ts:165](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L165)

Returns an iterator over the cartesian in the set.

#### Returns

`MapIterator`\<\[[`Cartesian`](../type-aliases/Cartesian.md), `V`\]\>

An iterator of `Cartesian`.

#### Implementation of

`Map.[iterator]`

***

### clear()

> **clear**(): `void`

Defined in: [cartesian-map.ts:49](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L49)

Removes all cartesian from the set.

#### Returns

`void`

#### Implementation of

`Map.clear`

***

### delete()

> **delete**(`value`: [`Cartesian`](../type-aliases/Cartesian.md)): `boolean`

Defined in: [cartesian-map.ts:59](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L59)

Removes a coordinate from the map.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | [`Cartesian`](../type-aliases/Cartesian.md) | The coordinate to remove. |

#### Returns

`boolean`

`true` if the coordinate was present and removed, `false` otherwise.

#### Implementation of

`Map.delete`

***

### entries()

> **entries**(): `MapIterator`\<\[[`Cartesian`](../type-aliases/Cartesian.md), `V`\]\>

Defined in: [cartesian-map.ts:77](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L77)

Returns an iterator over `[coordinate, value]` pairs for each coordinate in the map.

#### Returns

`MapIterator`\<\[[`Cartesian`](../type-aliases/Cartesian.md), `V`\]\>

An iterator of `[Cartesian, *V*]` pairs.

#### Implementation of

`Map.entries`

***

### forEach()

> **forEach**(`callback`: (`value`: `V`, `key`: [`Cartesian`](../type-aliases/Cartesian.md), `map`: `CartesianMap`\<`V`\>) => `void`, `thisArg?`: `this`): `void`

Defined in: [cartesian-map.ts:91](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L91)

Executes a provided function once for each coordinate in the set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`: `V`, `key`: [`Cartesian`](../type-aliases/Cartesian.md), `map`: `CartesianMap`\<`V`\>) => `void` | Function to execute for each coordinate. |
| `thisArg?` | `this` | Value to use as `this` when executing `callback`. |

#### Returns

`void`

#### Implementation of

`Map.forEach`

***

### get()

> **get**(`key`: [`Cartesian`](../type-aliases/Cartesian.md)): `undefined` \| `V`

Defined in: [cartesian-map.ts:106](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L106)

Retrieves the value associated with the given Cartesian key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`Cartesian`](../type-aliases/Cartesian.md) | The Cartesian coordinate used to locate the value. |

#### Returns

`undefined` \| `V`

The value of type `V` if found; otherwise, `undefined`.

#### Implementation of

`Map.get`

***

### has()

> **has**(`coordinate`: [`Cartesian`](../type-aliases/Cartesian.md)): `boolean`

Defined in: [cartesian-map.ts:130](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L130)

Checks if a coordinate is present in the set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `coordinate` | [`Cartesian`](../type-aliases/Cartesian.md) | The coordinate to check. |

#### Returns

`boolean`

`true` if the coordinate exists in the set, `false` otherwise.

#### Implementation of

`Map.has`

***

### keys()

> **keys**(): `SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

Defined in: [cartesian-map.ts:116](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L116)

Returns an iterator over the cartesian in the set.

#### Returns

`SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

An iterator of `Cartesian`.

#### Implementation of

`Map.keys`

***

### set()

> **set**(`key`: [`Cartesian`](../type-aliases/Cartesian.md), `value`: `V`): `this`

Defined in: [cartesian-map.ts:141](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L141)

Add or update a value in the map.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`Cartesian`](../type-aliases/Cartesian.md) | - |
| `value` | `V` | A single coordinate or an array of cartesian to add. |

#### Returns

`this`

The set itself, for chaining.

#### Implementation of

`Map.set`

***

### values()

> **values**(): `MapIterator`\<`V`\>

Defined in: [cartesian-map.ts:154](https://github.com/technobuddha/library/blob/main/src/cartesian-map.ts#L154)

Returns an iterator over the cartesian in the set.

#### Returns

`MapIterator`\<`V`\>

An iterator of `Cartesian`.

#### Implementation of

`Map.values`
