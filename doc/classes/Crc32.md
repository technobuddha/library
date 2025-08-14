<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / Crc32

# Class: Crc32

Defined in: [crc32.ts:58](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L58)

Compute the CRC32 checksum

## Implements

- [`HashClass`](../interfaces/HashClass.md)

## Constructors

### Constructor

> **new Crc32**(): `Crc32`

Defined in: [crc32.ts:61](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L61)

#### Returns

`Crc32`

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [crc32.ts:83](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L83)

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](../type-aliases/BinaryEncoding.md)): `string`

Defined in: [crc32.ts:84](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L84)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `encoding` | [`BinaryEncoding`](../type-aliases/BinaryEncoding.md) |

##### Returns

`string`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

***

### update()

#### Call Signature

> **update**(`data`: [`TypedArray`](../type-aliases/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\>): `this`

Defined in: [crc32.ts:65](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L65)

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

Defined in: [crc32.ts:66](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L66)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `string` |
| `encoding?` | [`TextEncoding`](../type-aliases/TextEncoding.md) |

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)
