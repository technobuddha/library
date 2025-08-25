<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [JSON](./index.md) / JSONSet

# Class: JSONSet\<T\>

Defined in: [json-set.ts:32](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L32)

A Set-like collection for objects that can be serialized to JSON.

`JSONSet` stores objects by serializing them to JSON strings, allowing for deep equality
comparison of objects rather than reference equality. This is useful for storing and comparing
objects with the same structure and values, regardless of their references.

## Example

```ts
const set = new JSONSet<{ a: number }>();
set.add({ a: 1 });
set.has({ a: 1 }); // true
set.has({ a: 2 }); // false
```

## Remarks

- All objects are serialized using a `serialize` function and deserialized with a `deserialize` function.
- The set supports standard set operations such as union, intersection, difference, and symmetricDifference.
- Iteration yields deserialized objects.

## See

Set

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `JsonObject` | The type of objects stored in the set. Must extend `JsonObject`. |

## Implements

- [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\>

## Constructors

### Constructor

```ts
new JSONSet<T>(values?: 
  | null
| Iterable<T, any, any>): JSONSet<T>;
```

Defined in: [json-set.ts:35](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L35)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values?` | \| `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`T`, `any`, `any`\> |

#### Returns

`JSONSet`\<`T`\>

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `"JSONSet"` | `'JSONSet'` | [json-set.ts:43](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L43) |

## Accessors

### size

#### Get Signature

```ts
get size(): number;
```

Defined in: [json-set.ts:50](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L50)

##### Returns

`number`

the number of (unique) elements in Set.

#### Implementation of

```ts
Set.size
```

## Methods

### \[iterator\]()

```ts
iterator: SetIterator<T>;
```

Defined in: [json-set.ts:155](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L155)

#### Returns

`SetIterator`\<`T`\>

#### Implementation of

```ts
Set.[iterator]
```

***

### add()

```ts
add(value: T): this;
```

Defined in: [json-set.ts:54](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L54)

Appends a new element with a specified value to the end of the Set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`this`

#### Implementation of

```ts
Set.add
```

***

### clear()

```ts
clear(): void;
```

Defined in: [json-set.ts:59](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L59)

#### Returns

`void`

#### Implementation of

```ts
Set.clear
```

***

### delete()

```ts
delete(value: T): boolean;
```

Defined in: [json-set.ts:63](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L63)

Removes a specified value from the Set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`boolean`

Returns true if an element in the Set existed and has been removed, or false if the element does not exist.

#### Implementation of

```ts
Set.delete
```

***

### difference()

```ts
difference<U>(other: ReadonlySetLike<U>): Set<T>;
```

Defined in: [json-set.ts:67](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L67)

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`U`\> |

#### Returns

[`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\>

a new Set containing all the elements in this Set which are not also in the argument.

#### Implementation of

```ts
Set.difference
```

***

### entries()

```ts
entries(): SetIterator<[T, T]>;
```

Defined in: [json-set.ts:73](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L73)

Returns an iterable of [v,v] pairs for every value `v` in the set.

#### Returns

`SetIterator`\<\[`T`, `T`\]\>

#### Implementation of

```ts
Set.entries
```

***

### forEach()

```ts
forEach(callback: (value: T, key: T, set: Set<T>) => void, thisArg?: unknown): void;
```

Defined in: [json-set.ts:79](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L79)

Executes a provided function once per each value in the Set object, in insertion order.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`value`: `T`, `key`: `T`, `set`: [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\>) => `void` |
| `thisArg?` | `unknown` |

#### Returns

`void`

#### Implementation of

```ts
Set.forEach
```

***

### has()

```ts
has(value: T): boolean;
```

Defined in: [json-set.ts:85](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L85)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`boolean`

a boolean indicating whether an element with the specified value exists in the Set or not.

#### Implementation of

```ts
Set.has
```

***

### intersection()

```ts
intersection<U>(other: ReadonlySetLike<U>): Set<T & U>;
```

Defined in: [json-set.ts:89](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L89)

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`U`\> |

#### Returns

[`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T` & `U`\>

a new Set containing all the elements which are both in this Set and in the argument.

#### Implementation of

```ts
Set.intersection
```

***

### isDisjointFrom()

```ts
isDisjointFrom(other: ReadonlySetLike<unknown>): boolean;
```

Defined in: [json-set.ts:97](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L97)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

a boolean indicating whether this Set has no elements in common with the argument.

#### Implementation of

```ts
Set.isDisjointFrom
```

***

### isSubsetOf()

```ts
isSubsetOf(other: ReadonlySetLike<unknown>): boolean;
```

Defined in: [json-set.ts:106](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L106)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

a boolean indicating whether all the elements in this Set are also in the argument.

#### Implementation of

```ts
Set.isSubsetOf
```

***

### isSupersetOf()

```ts
isSupersetOf(other: ReadonlySetLike<unknown>): boolean;
```

Defined in: [json-set.ts:115](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L115)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

a boolean indicating whether all the elements in the argument are also in this Set.

#### Implementation of

```ts
Set.isSupersetOf
```

***

### keys()

```ts
keys(): SetIterator<T>;
```

Defined in: [json-set.ts:124](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L124)

Despite its name, returns an iterable of the values in the set.

#### Returns

`SetIterator`\<`T`\>

#### Implementation of

```ts
Set.keys
```

***

### symmetricDifference()

```ts
symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U>;
```

Defined in: [json-set.ts:128](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L128)

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`U`\> |

#### Returns

[`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T` \| `U`\>

a new Set containing all the elements which are in either this Set or in the argument, but not in both.

#### Implementation of

```ts
Set.symmetricDifference
```

***

### union()

```ts
union<U>(other: ReadonlySetLike<U>): Set<T | U>;
```

Defined in: [json-set.ts:145](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L145)

#### Type Parameters

| Type Parameter |
| ------ |
| `U` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`U`\> |

#### Returns

[`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T` \| `U`\>

a new Set containing all the elements in this Set and also all the elements in the argument.

#### Implementation of

```ts
Set.union
```

***

### values()

```ts
values(): SetIterator<T>;
```

Defined in: [json-set.ts:149](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L149)

Returns an iterable of values in the set.

#### Returns

`SetIterator`\<`T`\>

#### Implementation of

```ts
Set.values
```

