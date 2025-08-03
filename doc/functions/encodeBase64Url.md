<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / encodeBase64Url

# Function: encodeBase64Url()

## Call Signature

> **encodeBase64Url**(`chars`: `string`, `encoding`: [`TextEncoding`](../type-aliases/TextEncoding.md)): `string`

Defined in: [encode-base64.ts:124](https://github.com/technobuddha/library/blob/main/src/encode-base64.ts#L124)

Creates a Base64-encoded ASCII string from a string.

You can use this method to encode data which may otherwise cause communication problems,
transmit it, then use the [decodeBase64](decodeBase64.md) method to decode the data again. For example, you can
encode control characters such as ASCII values 0 through 31.

Before encoding, the string is converted to binary using [encodeText](encodeText.md) and the supplied ***encoding***

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `chars` | `string` | The string to encode |
| `encoding` | [`TextEncoding`](../type-aliases/TextEncoding.md) | The encoding of the input string |

### Returns

`string`

An ASCII string containing the Base64 representation

### Example

```typescript
encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
```

## Call Signature

> **encodeBase64Url**(`binary`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)): `string`

Defined in: [encode-base64.ts:142](https://github.com/technobuddha/library/blob/main/src/encode-base64.ts#L142)

Creates a Base64-encoded ASCII string from a binary source.

You can use this method to encode data which may otherwise cause communication problems,
transmit it, then use the [decodeBase64](decodeBase64.md) method to decode the data again. For example, you can
encode control characters such as ASCII values 0 through 31.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `binary` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | The *binary data* to encode |

### Returns

`string`

An ASCII string containing the Base64 representation

### Example

```typescript
encodeBase64(new Uint8Array([1, 2, 3]); // "AQID"
```
