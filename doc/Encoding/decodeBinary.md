<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / decodeBinary

# Function: decodeBinary()

> **decodeBinary**(`input`: `string`, `encoding`: [`BinaryEncoding`](BinaryEncoding.md)): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [decode-binary.ts:20](https://github.com/technobuddha/library/blob/main/src/decode-binary.ts#L20)

Decode a string into a binary object

The string can be in *base64*, *base64url*, *hex*, or *binary* format.

base64 or base64url: The binary object was encoded using [encodeBase64](encodeBase64.md)
hex: each byte in the binary object is converted to a series of 2-digit hexadecimal numbers
binary: each byte in the binary object is converted to a characters

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | binary object |
| `encoding` | [`BinaryEncoding`](BinaryEncoding.md) | The encoding to use |

## Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

encoded string

