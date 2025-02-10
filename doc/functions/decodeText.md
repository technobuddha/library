[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / decodeText

# Function: decodeText()

> **decodeText**(`input`, `_encoding`): `string`

Defined in: [decode-text.ts:12](https://github.com/technobuddha/library/blob/main/src/decode-text.ts#L12)

Decode a UTF8 encoded string into unicode

## Parameters

### input

the utf encoded string

`ArrayBufferLike` | `Uint8Array` | `Int8Array` | `Int16Array` | `Uint16Array` | `Int32Array` | `Uint32Array` | `Float32Array` | `Float64Array` | `Uint8ClampedArray` | `BigInt64Array` | `BigUint64Array`

### \_encoding

[`Encoding`](../type-aliases/Encoding.md) = `'utf8'`

## Returns

`string`

the decoded strings (which is encoded as UTF-16 by javascript)
