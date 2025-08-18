<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / HashClass

# Interface: HashClass

Defined in: [hash-base.ts:18](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L18)

Interface representing a generic hash algorithm implementation.

## Remarks

This interface defines the contract for hash classes, supporting
updating the hash with data and producing a digest in various formats.

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [hash-base.ts:26](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L26)

Finalizes the hash computation and returns the resulting hash digest.
This method performs any necessary padding and processes the final block
of data according to the hash algorithm's specification. The output is returned
as a raw `Uint8Array`.

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The hash digest as a `Uint8Array`

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](BinaryEncoding.md)): `string`

Defined in: [hash-base.ts:37](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L37)

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

***

### update()

#### Call Signature

> **update**(`data`: [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)): `this`

Defined in: [hash-base.ts:44](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L44)

Updates the hash with the given binary data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | The data to update the hash with, as a TypedArray or ArrayBuffer. |

##### Returns

`this`

The hash instance for method chaining.

#### Call Signature

> **update**(`data`: `string`, `encoding?`: [`TextEncoding`](../Unicode/TextEncoding.md)): `this`

Defined in: [hash-base.ts:52](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L52)

Updates the hash with the given string data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` | The string data to update the hash with. |
| `encoding?` | [`TextEncoding`](../Unicode/TextEncoding.md) | Optional text encoding of the input string (e.g., 'utf8'). |

##### Returns

`this`

The hash instance for method chaining.
