<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / HashBase

# Class: `abstract` HashBase

Defined in: [hash-base.ts:26](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L26)

The base class for most cryptographic hash functions

## Extended by

- [`Sha1`](Sha1.md)
- [`Sha224`](Sha224.md)
- [`Sha256`](Sha256.md)
- [`Sha384`](Sha384.md)
- [`Sha512`](Sha512.md)

## Implements

- [`HashClass`](../interfaces/HashClass.md)

## Constructors

### Constructor

> **new HashBase**(`blockSize`: `number`, `finalSize`: `number`): `HashBase`

Defined in: [hash-base.ts:32](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L32)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `blockSize` | `number` |
| `finalSize` | `number` |

#### Returns

`HashBase`

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="block"></a> `block` | `readonly` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [hash-base.ts:27](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L27) |
| <a id="blocksize"></a> `blockSize` | `readonly` | `number` | [hash-base.ts:28](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L28) |
| <a id="finalsize"></a> `finalSize` | `readonly` | `number` | [hash-base.ts:29](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L29) |

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [hash-base.ts:43](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L43)

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](../type-aliases/BinaryEncoding.md)): `string`

Defined in: [hash-base.ts:44](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L44)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `encoding` | [`BinaryEncoding`](../type-aliases/BinaryEncoding.md) |

##### Returns

`string`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

***

### hash()

> `abstract` `protected` **hash**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [hash-base.ts:39](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L39)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

***

### update()

#### Call Signature

> **update**(`data`: [`TypedArray`](../type-aliases/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\>): `this`

Defined in: [hash-base.ts:85](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L85)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`TypedArray`](../type-aliases/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\> |

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)

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

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)

***

### updateCounters()

> `abstract` `protected` **updateCounters**(`buffer`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)): `void`

Defined in: [hash-base.ts:41](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L41)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buffer` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) |

#### Returns

`void`
