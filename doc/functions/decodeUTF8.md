[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / decodeUTF8

# Function: decodeUTF8()

> **decodeUTF8**(`input`): `string`

Defined in: [decode-utf8.ts:10](https://github.com/technobuddha/library/blob/main/src/decode-utf8.ts#L10)

Decode a UTF8 encoded string into unicode

## Parameters

### input

the utf encoded string

`ArrayBufferLike` | `Uint8Array` | `Int8Array` | `Uint8ClampedArray` | `Int16Array` | `Uint16Array` | `Int32Array` | `Uint32Array` | `Float32Array` | `Float64Array` | `BigInt64Array` | `BigUint64Array`

## Returns

`string`

the decoded strings (which is encoded as UTF-16 by javascript)
