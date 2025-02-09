[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / encodeBinary

# Function: encodeBinary()

> **encodeBinary**(`input`, `encoding`): `string`

Defined in: [encode-binary.ts:19](https://github.com/technobuddha/library/blob/main/src/encode-binary.ts#L19)

Encode an binary object into a string

The string can be in *base64*, *base64url*, *hex*, or *binary* format.

base64: The binary object is encoded using [encodeBase64](encodeBase64.md)
base64url: The binary object is encoded using [encodeBase64Url](encodeBase64Url.md)
hex: each byte in the binary object is converted to a series of 2-digit hexadecimal numbers
binary: each byte in the binary object is converted to a characters

## Parameters

### input

`Uint8Array`

binary object

### encoding

[`BinaryEncoding`](../type-aliases/BinaryEncoding.md)

The encoding to use

## Returns

`string`

encoded string
