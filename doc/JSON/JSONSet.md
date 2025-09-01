[@technobuddha/library](../modules.md) / JSONSet

# Class: JSONSet\<T\>

Defined in: [src/json-set.ts:27](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L27)

A Set-like collection for objects that can be serialized to JSON.

`JSONSet` stores objects by serializing them to JSON strings, allowing for deep equality
comparison of objects rather than reference equality. This is useful for storing and comparing
objects with the same structure and values, regardless of their references.

## Example

```typescript
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

Defined in: [src/json-set.ts:30](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values?` | \| `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`T`, `any`, `any`\> |

#### Returns

`JSONSet`\<`T`\>

## Properties

| Property | Modifier | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `"JSONSet"` | `'JSONSet'` | The string tag used by Object.prototype.toString for this class. | [src/json-set.ts:41](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L41) |

## Accessors

### size

#### Get Signature

```ts
get size(): number;
```

Defined in: [src/json-set.ts:51](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L51)

Gets the number of elements in the set.

##### Returns

`number`

#### Implementation of

```ts
Set.size
```

## Methods

### \[iterator\]()

```ts
iterator: SetIterator<T>;
```

Defined in: [src/json-set.ts:204](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L204)

Returns an iterator over the values in the set.

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

Defined in: [src/json-set.ts:58](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L58)

Adds a serialized value to the set.

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

Defined in: [src/json-set.ts:66](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L66)

Removes all elements from the set.

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

Defined in: [src/json-set.ts:73](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L73)

Removes the specified value from the set if it exists.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`boolean`

#### Implementation of

```ts
Set.delete
```

***

### difference()

```ts
difference<U>(other: ReadonlySetLike<U>): Set<T>;
```

Defined in: [src/json-set.ts:80](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L80)

Returns a new set containing elements present in this set but not in the other set.

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

#### Implementation of

```ts
Set.difference
```

***

### entries()

```ts
entries(): SetIterator<[T, T]>;
```

Defined in: [src/json-set.ts:89](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L89)

Returns an iterator over the set's values as [value, value] pairs.

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

Defined in: [src/json-set.ts:98](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L98)

Executes a provided function once for each value in the set.

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

Defined in: [src/json-set.ts:107](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L107)

Determines whether the specified value exists in the set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`boolean`

#### Implementation of

```ts
Set.has
```

***

### intersection()

```ts
intersection<U>(other: ReadonlySetLike<U>): Set<T & U>;
```

Defined in: [src/json-set.ts:114](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L114)

Returns a new set containing only the elements present in both this set and the provided set.

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

#### Implementation of

```ts
Set.intersection
```

***

### isDisjointFrom()

```ts
isDisjointFrom(other: ReadonlySetLike<unknown>): boolean;
```

Defined in: [src/json-set.ts:125](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L125)

Determines whether this set and the specified set have no elements in common.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

#### Implementation of

```ts
Set.isDisjointFrom
```

***

### isSubsetOf()

```ts
isSubsetOf(other: ReadonlySetLike<unknown>): boolean;
```

Defined in: [src/json-set.ts:137](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L137)

Determines whether all elements of this set are contained in another set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

#### Implementation of

```ts
Set.isSubsetOf
```

***

### isSupersetOf()

```ts
isSupersetOf(other: ReadonlySetLike<unknown>): boolean;
```

Defined in: [src/json-set.ts:149](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L149)

Determines whether this set contains all elements of the specified set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

#### Implementation of

```ts
Set.isSupersetOf
```

***

### keys()

```ts
keys(): SetIterator<T>;
```

Defined in: [src/json-set.ts:161](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L161)

Returns an iterator over the keys in the set.

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

Defined in: [src/json-set.ts:168](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L168)

Returns a new set containing elements that are in either this set or the other set, but not in both.

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

#### Implementation of

```ts
Set.symmetricDifference
```

***

### union()

```ts
union<U>(other: ReadonlySetLike<U>): Set<T | U>;
```

Defined in: [src/json-set.ts:188](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L188)

Returns a new set containing all unique elements from this set and another set.

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

#### Implementation of

```ts
Set.union
```

***

### values()

```ts
values(): SetIterator<T>;
```

Defined in: [src/json-set.ts:195](https://github.com/technobuddha/library/blob/main/src/json-set.ts#L195)

Returns an iterator that yields each value in the set after deserialization.

#### Returns

`SetIterator`\<`T`\>

#### Implementation of

```ts
Set.values
```
