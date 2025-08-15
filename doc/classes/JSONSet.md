<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / JSONSet

# Class: JSONSet\<T\>

Defined in: json-set.ts:5

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `JsonObject` |

## Implements

- [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\>

## Constructors

### Constructor

> **new JSONSet**\<`T`\>(`values?`: `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`T`, `any`, `any`\>): `JSONSet`\<`T`\>

Defined in: json-set.ts:8

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values?` | `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`T`, `any`, `any`\> |

#### Returns

`JSONSet`\<`T`\>

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="tostringtag"></a> `[toStringTag]` | `readonly` | `"JSONSet"` | `'JSONSet'` | json-set.ts:16 |
| <a id="set"></a> `set` | `protected` | [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`string`\> | `undefined` | json-set.ts:6 |

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: json-set.ts:23

##### Returns

`number`

the number of (unique) elements in Set.

#### Implementation of

`Set.size`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `SetIterator`\<`T`\>

Defined in: json-set.ts:128

#### Returns

`SetIterator`\<`T`\>

#### Implementation of

`Set.[iterator]`

***

### add()

> **add**(`value`: `T`): `this`

Defined in: json-set.ts:27

Appends a new element with a specified value to the end of the Set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`this`

#### Implementation of

`Set.add`

***

### clear()

> **clear**(): `void`

Defined in: json-set.ts:32

#### Returns

`void`

#### Implementation of

`Set.clear`

***

### delete()

> **delete**(`value`: `T`): `boolean`

Defined in: json-set.ts:36

Removes a specified value from the Set.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`boolean`

Returns true if an element in the Set existed and has been removed, or false if the element does not exist.

#### Implementation of

`Set.delete`

***

### difference()

> **difference**\<`U`\>(`other`: `ReadonlySetLike`\<`U`\>): [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\>

Defined in: json-set.ts:40

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

`Set.difference`

***

### entries()

> **entries**(): `SetIterator`\<\[`T`, `T`\]\>

Defined in: json-set.ts:46

Returns an iterable of [v,v] pairs for every value `v` in the set.

#### Returns

`SetIterator`\<\[`T`, `T`\]\>

#### Implementation of

`Set.entries`

***

### forEach()

> **forEach**(`callback`: (`value`: `T`, `key`: `T`, `set`: [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\>) => `void`, `thisArg?`: `unknown`): `void`

Defined in: json-set.ts:52

Executes a provided function once per each value in the Set object, in insertion order.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`value`: `T`, `key`: `T`, `set`: [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\>) => `void` |
| `thisArg?` | `unknown` |

#### Returns

`void`

#### Implementation of

`Set.forEach`

***

### has()

> **has**(`value`: `T`): `boolean`

Defined in: json-set.ts:58

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |

#### Returns

`boolean`

a boolean indicating whether an element with the specified value exists in the Set or not.

#### Implementation of

`Set.has`

***

### intersection()

> **intersection**\<`U`\>(`other`: `ReadonlySetLike`\<`U`\>): [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T` & `U`\>

Defined in: json-set.ts:62

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

`Set.intersection`

***

### isDisjointFrom()

> **isDisjointFrom**(`other`: `ReadonlySetLike`\<`unknown`\>): `boolean`

Defined in: json-set.ts:70

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

a boolean indicating whether this Set has no elements in common with the argument.

#### Implementation of

`Set.isDisjointFrom`

***

### isSubsetOf()

> **isSubsetOf**(`other`: `ReadonlySetLike`\<`unknown`\>): `boolean`

Defined in: json-set.ts:79

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

a boolean indicating whether all the elements in this Set are also in the argument.

#### Implementation of

`Set.isSubsetOf`

***

### isSupersetOf()

> **isSupersetOf**(`other`: `ReadonlySetLike`\<`unknown`\>): `boolean`

Defined in: json-set.ts:88

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `ReadonlySetLike`\<`unknown`\> |

#### Returns

`boolean`

a boolean indicating whether all the elements in the argument are also in this Set.

#### Implementation of

`Set.isSupersetOf`

***

### keys()

> **keys**(): `SetIterator`\<`T`\>

Defined in: json-set.ts:97

Despite its name, returns an iterable of the values in the set.

#### Returns

`SetIterator`\<`T`\>

#### Implementation of

`Set.keys`

***

### replicate()

> `protected` **replicate**\<`X`\>(`values?`: `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`X`, `any`, `any`\>): [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`X`\>

Defined in: json-set.ts:18

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `X` | `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `values?` | `null` \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`X`, `any`, `any`\> |

#### Returns

[`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`X`\>

***

### symmetricDifference()

> **symmetricDifference**\<`U`\>(`other`: `ReadonlySetLike`\<`U`\>): [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T` \| `U`\>

Defined in: json-set.ts:101

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

`Set.symmetricDifference`

***

### union()

> **union**\<`U`\>(`other`: `ReadonlySetLike`\<`U`\>): [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T` \| `U`\>

Defined in: json-set.ts:118

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

`Set.union`

***

### values()

> **values**(): `SetIterator`\<`T`\>

Defined in: json-set.ts:122

Returns an iterable of values in the set.

#### Returns

`SetIterator`\<`T`\>

#### Implementation of

`Set.values`
