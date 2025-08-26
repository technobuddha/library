<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / encodeBase64

# Function: encodeBase64()

Creates a encoded ASCII string from a string using [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.

You can use this method to encode data which may otherwise cause communication problems,
transmit it, then use the [decodeBase64](decodeBase64.md) method to decode the data again. For example, you can
encode control characters such as ASCII values 0 through 31.

## Example

```typescript
encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
encodeBase64(new Uint8Array([1, 2, 3]); // "AQID"
```

## Call Signature

```ts
function encodeBase64(chars: string, encoding: TextEncoding): string;
```

Defined in: [encode-base-64.ts:12](https://github.com/technobuddha/library/blob/main/src/encode-base-64.ts#L12)

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
function encodeBase64(binary: BinaryObject): string;
```

Defined in: [encode-base-64.ts:16](https://github.com/technobuddha/library/blob/main/src/encode-base-64.ts#L16)

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `binary` | [`BinaryObject`](BinaryObject.md) | The Binary object to encode |

### Returns

`string`

