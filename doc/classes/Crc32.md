<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / Crc32

# Class: Crc32

Defined in: [crc32.ts:57](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L57)

Compute the CRC32 checksum

## Implements

- [`HashClass`](../interfaces/HashClass.md)

## Constructors

### new Crc32()

> **new Crc32**(): [`Crc32`](Crc32.md)

Defined in: [crc32.ts:60](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L60)

#### Returns

[`Crc32`](Crc32.md)

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [crc32.ts:79](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L79)

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](../type-aliases/BinaryEncoding.md)): `string`

Defined in: [crc32.ts:80](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L80)

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

> **update**(`data`: [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `TypedArray`): `this`

Defined in: [crc32.ts:64](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L64)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `TypedArray` |

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)

#### Call Signature

> **update**(`data`: `string`, `encoding`?: [`TextEncoding`](../type-aliases/TextEncoding.md)): `this`

Defined in: [crc32.ts:65](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L65)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `string` |
| `encoding`? | [`TextEncoding`](../type-aliases/TextEncoding.md) |

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)
