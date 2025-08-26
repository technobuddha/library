<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / encodeBinary

# Function: encodeBinary()

```ts
function encodeBinary(input: Uint8Array, encoding: BinaryEncoding): string;
```

Defined in: [encode-binary.ts:22](https://github.com/technobuddha/library/blob/main/src/encode-binary.ts#L22)

Encode an binary object into a string

The string can be in *base64*, *base64url*, *hex*, or *binary* format.

base64: The binary object is encoded using [encodeBase64](encodeBase64.md)
base64url: The binary object is encoded using [encodeBase64Url](encodeBase64Url.md)
hex: each byte in the binary object is converted to a series of 2-digit hexadecimal numbers
binary: each byte in the binary object is converted to a characters

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | binary object |
| `encoding` | [`BinaryEncoding`](BinaryEncoding.md) | The encoding to use |

## Returns

`string`

encoded string

