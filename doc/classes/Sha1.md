<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / Sha1

# Class: Sha1

Defined in: [sha1.ts:48](https://github.com/technobuddha/library/blob/main/src/sha1.ts#L48)

Secure Hash Algorithm, SHA-1

## Extends

- [`HashBase`](HashBase.md)

## Constructors

### Constructor

> **new Sha1**(): `Sha1`

Defined in: [sha1.ts:56](https://github.com/technobuddha/library/blob/main/src/sha1.ts#L56)

#### Returns

`Sha1`

#### Overrides

[`HashBase`](HashBase.md).[`constructor`](HashBase.md#constructor)

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="block"></a> `block` | `readonly` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [`HashBase`](HashBase.md).[`block`](HashBase.md#block) | [hash-base.ts:27](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L27) |
| <a id="blocksize"></a> `blockSize` | `readonly` | `number` | [`HashBase`](HashBase.md).[`blockSize`](HashBase.md#blocksize) | [hash-base.ts:28](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L28) |
| <a id="finalsize"></a> `finalSize` | `readonly` | `number` | [`HashBase`](HashBase.md).[`finalSize`](HashBase.md#finalsize) | [hash-base.ts:29](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L29) |

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [hash-base.ts:43](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L43)

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

##### Inherited from

[`HashBase`](HashBase.md).[`digest`](HashBase.md#digest)

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](../type-aliases/BinaryEncoding.md)): `string`

Defined in: [hash-base.ts:44](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L44)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `encoding` | [`BinaryEncoding`](../type-aliases/BinaryEncoding.md) |

##### Returns

`string`

##### Inherited from

[`HashBase`](HashBase.md).[`digest`](HashBase.md#digest)

***

### hash()

> `protected` **hash**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [sha1.ts:100](https://github.com/technobuddha/library/blob/main/src/sha1.ts#L100)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

#### Overrides

[`HashBase`](HashBase.md).[`hash`](HashBase.md#hash)

***

### update()

#### Call Signature

> **update**(`data`: [`TypedArray`](../type-aliases/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)): `this`

Defined in: [hash-base.ts:85](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L85)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`TypedArray`](../type-aliases/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) |

##### Returns

`this`

##### Inherited from

[`HashBase`](HashBase.md).[`update`](HashBase.md#update)

#### Call Signature

> **update**(`data`: `string`, `encoding?`: [`TextEncoding`](../type-aliases/TextEncoding.md)): `this`

Defined in: [hash-base.ts:86](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L86)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `string` |
| `encoding?` | [`TextEncoding`](../type-aliases/TextEncoding.md) |

##### Returns

`this`

##### Inherited from

[`HashBase`](HashBase.md).[`update`](HashBase.md#update)

***

### updateCounters()

> `protected` **updateCounters**(`buffer`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)): `void`

Defined in: [sha1.ts:61](https://github.com/technobuddha/library/blob/main/src/sha1.ts#L61)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buffer` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) |

#### Returns

`void`

#### Overrides

[`HashBase`](HashBase.md).[`updateCounters`](HashBase.md#updatecounters)
