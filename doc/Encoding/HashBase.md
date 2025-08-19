<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / HashBase

# Abstract Class: HashBase

Defined in: [hash-base.ts:61](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L61)

The base class for most cryptographic hash functions

## Extended by

- [`Sha1`](Sha1.md)
- [`Sha224`](Sha224.md)
- [`Sha256`](Sha256.md)
- [`Sha384`](Sha384.md)
- [`Sha512`](Sha512.md)

## Implements

- [`HashClass`](HashClass.md)

## Constructors

### Constructor

> **new HashBase**(`blockSize`: `number`, `finalSize`: `number`): `HashBase`

Defined in: [hash-base.ts:93](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L93)

Creates a new instance of the hash base class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `blockSize` | `number` | The size of the internal block buffer in bytes. |
| `finalSize` | `number` | The size of the final hash output in bytes. |

#### Returns

`HashBase`

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [hash-base.ts:124](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L124)

Finalizes the hash computation and returns the resulting hash digest.
This method performs any necessary padding and processes the final block
of data according to the hash algorithm's specification. The output is returned
as a raw `Uint8Array`.

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The hash digest as a `Uint8Array`

##### Implementation of

[`HashClass`](HashClass.md).[`digest`](HashClass.md#digest)

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](BinaryEncoding.md)): `string`

Defined in: [hash-base.ts:125](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L125)

Finalizes the hash computation and returns the resulting hash digest.
This method performs any necessary padding and processes the final block
of data according to the hash algorithm's specification. The output is
or encoded as a string in the specified binary encoding.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `encoding` | [`BinaryEncoding`](BinaryEncoding.md) | Optional. The encoding to use for the output digest (e.g., 'hex', 'base64'). |

##### Returns

`string`

An encoded string, depending on the `encoding` parameter.

##### Implementation of

[`HashClass`](HashClass.md).[`digest`](HashClass.md#digest)

***

### update()

#### Call Signature

> **update**(`data`: [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\>): `this`

Defined in: [hash-base.ts:166](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L166)

Updates the hash with the given binary data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\> | The data to update the hash with, as a TypedArray or ArrayBuffer. |

##### Returns

`this`

The hash instance for method chaining.

##### Implementation of

[`HashClass`](HashClass.md).[`update`](HashClass.md#update)

#### Call Signature

> **update**(`data`: `string`, `encoding?`: [`TextEncoding`](../Unicode/TextEncoding.md)): `this`

Defined in: [hash-base.ts:167](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L167)

Updates the hash with the given string data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` | The string data to update the hash with. |
| `encoding?` | [`TextEncoding`](../Unicode/TextEncoding.md) | Optional text encoding of the input string (e.g., 'utf8'). |

##### Returns

`this`

The hash instance for method chaining.

##### Implementation of

[`HashClass`](HashClass.md).[`update`](HashClass.md#update)
