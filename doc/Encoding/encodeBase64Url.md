<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / encodeBase64Url

# Function: encodeBase64Url()

Creates a encoded ASCII string from a string using [Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.

You can use this method to encode data which may otherwise cause communication problems,
transmit it, then use the [decodeBase64Url](decodeBase64Url.md) method to decode the data again. For example, you can
encode control characters such as ASCII values 0 through 31.

Before encoding, the string is converted to binary using [encodeText](../Unicode/encodeText.md) and the supplied ***encoding***

## Param

The string to encode

## Param

The encoding of the input string

## Example

```typescript
encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
encodeBase64(new Uint8Array([1, 2, 3])); // "AQID"
encodeBase64(new Uint8Array([1, 2, 3])); // "AQID"
```

## Call Signature

```ts
function encodeBase64Url(chars: string, encoding: TextEncoding): string;
```

Defined in: [encode-base-64-url.ts:12](https://github.com/technobuddha/library/blob/main/src/encode-base-64-url.ts#L12)

Before encoding, the string is converted to binary using [encodeText](../Unicode/encodeText.md) and the supplied `encoding`

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `chars` | `string` | The string to encode |
| `encoding` | [`TextEncoding`](../Unicode/TextEncoding.md) | The encoding of the input string |

### Returns

`string`

## Call Signature

```ts
function encodeBase64Url(binary: BinaryObject): string;
```

Defined in: [encode-base-64-url.ts:16](https://github.com/technobuddha/library/blob/main/src/encode-base-64-url.ts#L16)

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `binary` | [`BinaryObject`](BinaryObject.md) | The Binary object to encode |

### Returns

`string`

