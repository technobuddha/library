<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / decodeBinary

# Function: decodeBinary()

> **decodeBinary**(`input`, `encoding`): `Uint8Array`

Defined in: [decode-binary.ts:18](https://github.com/technobuddha/library/blob/main/src/decode-binary.ts#L18)

Decode a string into a binary object

The string can be in *base64*, *base64url*, *hex*, or *binary* format.

base64 or base64url: The binary object was encoded using [encodeBase64](encodeBase64.md)
hex: each byte in the binary object is converted to a series of 2-digit hexadecimal numbers
binary: each byte in the binary object is converted to a characters

## Parameters

### input

`string`

binary object

### encoding

[`BinaryEncoding`](../type-aliases/BinaryEncoding.md)

The encoding to use

## Returns

`Uint8Array`

encoded string
