[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / Crc32

# Class: Crc32

Defined in: [crc32.ts:57](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L57)

Compute the CRC32 checksum for a string

## Param

The string

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

> **digest**(): `Uint8Array`

Defined in: [crc32.ts:79](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L79)

##### Returns

`Uint8Array`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

#### Call Signature

> **digest**(`encoding`): `string`

Defined in: [crc32.ts:80](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L80)

##### Parameters

###### encoding

[`BinaryEncoding`](../type-aliases/BinaryEncoding.md)

##### Returns

`string`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

***

### update()

#### Call Signature

> **update**(`data`): `this`

Defined in: [crc32.ts:64](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L64)

##### Parameters

###### data

`ArrayBuffer` | `TypedArray`

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)

#### Call Signature

> **update**(`data`, `encoding`?): `this`

Defined in: [crc32.ts:65](https://github.com/technobuddha/library/blob/main/src/crc32.ts#L65)

##### Parameters

###### data

`string`

###### encoding?

[`Encoding`](../type-aliases/Encoding.md)

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)
