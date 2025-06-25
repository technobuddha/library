<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / CartesianSet

# Class: CartesianSet

Defined in: [cartesian-set.ts:24](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L24)

Represents a set of 2D cartesian, optimized for efficient storage and lookup.

`CartesianSet` provides set-like operations (union, intersection, difference, etc.)
for objects with `{ x, y }` properties, where `x` and `y` are numbers.

Internally, cartesian are stored in a nested `Map<number, Set<number>>` structure,
allowing for fast addition, deletion, and membership checks.

Example usage:
```typescript
const set = new CartesianSet([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
set.add({ x: 5, y: 6 });
set.has({ x: 1, y: 2 }); // true
```

Supports all standard set operations, as well as iteration and forEach.

## Implements

- `ReadonlySetLike`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

## Constructors

### Constructor

> **new CartesianSet**(`cartesian?`: `null` \| [`Cartesian`](../type-aliases/Cartesian.md)[]): `CartesianSet`

Defined in: [cartesian-set.ts:32](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L32)

Creates a new `CartesianSet` optionally initialized with an array of cartesian.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cartesian?` | `null` \| [`Cartesian`](../type-aliases/Cartesian.md)[] | Optional array of cartesian to initialize the set. |

#### Returns

`CartesianSet`

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `"CartesianSet"` | `'CartesianSet'` | [cartesian-set.ts:51](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L51) |

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [cartesian-set.ts:43](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L43)

Gets the number of unique cartesian in the set.

##### Returns

`number`

#### Implementation of

`ReadonlySetLike.size`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

Defined in: [cartesian-set.ts:279](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L279)

Returns an iterator over the cartesian in the set.

#### Returns

`SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

An iterator of `Cartesian`.

***

### add()

> **add**(`value`: [`Cartesian`](../type-aliases/Cartesian.md) \| [`Cartesian`](../type-aliases/Cartesian.md)[]): `this`

Defined in: [cartesian-set.ts:59](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L59)

Adds one or more cartesian to the set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | [`Cartesian`](../type-aliases/Cartesian.md) \| [`Cartesian`](../type-aliases/Cartesian.md)[] | A single coordinate or an array of cartesian to add. |

#### Returns

`this`

The set itself, for chaining.

***

### clear()

> **clear**(): `void`

Defined in: [cartesian-set.ts:74](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L74)

Removes all cartesian from the set.

#### Returns

`void`

***

### delete()

> **delete**(`value`: [`Cartesian`](../type-aliases/Cartesian.md)): `boolean`

Defined in: [cartesian-set.ts:84](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L84)

Removes a coordinate from the set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | [`Cartesian`](../type-aliases/Cartesian.md) | The coordinate to remove. |

#### Returns

`boolean`

`true` if the coordinate was present and removed, `false` otherwise.

***

### difference()

> **difference**(`other`: `CartesianSet`): `CartesianSet`

Defined in: [cartesian-set.ts:103](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L103)

Returns a new set containing the cartesian present in this set but not in the other set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `other` | `CartesianSet` | The set to compare against. |

#### Returns

`CartesianSet`

A new `CartesianSet` with the difference.

***

### entries()

> **entries**(): `SetIterator`\<\[[`Cartesian`](../type-aliases/Cartesian.md), [`Cartesian`](../type-aliases/Cartesian.md)\]\>

Defined in: [cartesian-set.ts:118](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L118)

Returns an iterator over `[coordinate, coordinate]` pairs for each coordinate in the set.

#### Returns

`SetIterator`\<\[[`Cartesian`](../type-aliases/Cartesian.md), [`Cartesian`](../type-aliases/Cartesian.md)\]\>

An iterator of `[Cartesian, Cartesian]` pairs.

***

### forEach()

> **forEach**(`callback`: (`value`: [`Cartesian`](../type-aliases/Cartesian.md), `key`: [`Cartesian`](../type-aliases/Cartesian.md), `set`: `CartesianSet`) => `void`, `thisArg?`: `this`): `void`

Defined in: [cartesian-set.ts:130](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L130)

Executes a provided function once for each coordinate in the set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`: [`Cartesian`](../type-aliases/Cartesian.md), `key`: [`Cartesian`](../type-aliases/Cartesian.md), `set`: `CartesianSet`) => `void` | Function to execute for each coordinate. |
| `thisArg?` | `this` | Value to use as `this` when executing `callback`. |

#### Returns

`void`

***

### has()

> **has**(`coordinate`: [`Cartesian`](../type-aliases/Cartesian.md)): `boolean`

Defined in: [cartesian-set.ts:145](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L145)

Checks if a coordinate is present in the set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `coordinate` | [`Cartesian`](../type-aliases/Cartesian.md) | The coordinate to check. |

#### Returns

`boolean`

`true` if the coordinate exists in the set, `false` otherwise.

#### Implementation of

`ReadonlySetLike.has`

***

### intersection()

> **intersection**(`other`: `CartesianSet`): `CartesianSet`

Defined in: [cartesian-set.ts:156](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L156)

Returns a new set containing only the cartesian present in both this set and the other set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `other` | `CartesianSet` | The set to intersect with. |

#### Returns

`CartesianSet`

A new `CartesianSet` with the intersection.

***

### isDisjointFrom()

> **isDisjointFrom**(`other`: `CartesianSet`): `boolean`

Defined in: [cartesian-set.ts:172](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L172)

Checks if this set and the other set have no cartesian in common.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `other` | `CartesianSet` | The set to compare against. |

#### Returns

`boolean`

`true` if the sets are disjoint, `false` otherwise.

***

### isSubsetOf()

> **isSubsetOf**(`other`: `CartesianSet`): `boolean`

Defined in: [cartesian-set.ts:187](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L187)

Checks if this set is a subset of another set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `other` | `CartesianSet` | The set to compare against. |

#### Returns

`boolean`

`true` if every coordinate in this set is also in the other set.

***

### isSupersetOf()

> **isSupersetOf**(`other`: `CartesianSet`): `boolean`

Defined in: [cartesian-set.ts:202](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L202)

Checks if this set is a superset of another set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `other` | `CartesianSet` | The set to compare against. |

#### Returns

`boolean`

`true` if every coordinate in the other set is also in this set.

***

### keys()

> **keys**(): `SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

Defined in: [cartesian-set.ts:216](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L216)

Returns an iterator over the cartesian in the set.

#### Returns

`SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

An iterator of `Cartesian`.

#### Implementation of

`ReadonlySetLike.keys`

***

### symmetricDifference()

> **symmetricDifference**(`other`: `CartesianSet`): `CartesianSet`

Defined in: [cartesian-set.ts:226](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L226)

Returns a new set containing cartesian that are in either this set or the other set, but not both.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `other` | `CartesianSet` | The set to compare against. |

#### Returns

`CartesianSet`

A new `CartesianSet` with the symmetric difference.

***

### union()

> **union**(`other`: `CartesianSet`): `CartesianSet`

Defined in: [cartesian-set.ts:250](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L250)

Returns a new set containing all cartesian from both this set and the other set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `other` | `CartesianSet` | The set to unite with. |

#### Returns

`CartesianSet`

A new `CartesianSet` with the union.

***

### values()

> **values**(): `SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

Defined in: [cartesian-set.ts:266](https://github.com/technobuddha/library/blob/main/src/cartesian-set.ts#L266)

Returns an iterator over the cartesian in the set.

#### Returns

`SetIterator`\<[`Cartesian`](../type-aliases/Cartesian.md)\>

An iterator of `Cartesian`.
