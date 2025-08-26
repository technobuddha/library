<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / decodeBase64Url

# Function: decodeBase64Url()

## Call Signature

```ts
function decodeBase64Url(input: string): Uint8Array;
```

Defined in: [decode-base-64-url.ts:25](https://github.com/technobuddha/library/blob/main/src/decode-base-64-url.ts#L25)

Decodes a string of data which has been encoded using
[Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.

You can use the [encodeBase64Url](encodeBase64Url.md) method to encode and transmit data which may otherwise cause
communication problems, then transmit it and use the `decodeBase64Url` method to decode the data again.
For example, you can encode, transmit, and decode control characters such as ASCII values
0 through 31.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | A string containing the Base64 encoded data to decode. |

### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

An ASCII string containing decoded dat

### Remarks

Whitespace within the Base64 encoded string is ignored.

### Throws

`TypeError` If the input string is not correctly encoded.

### Example

```typescript
decodeBase64Url('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
```

## Call Signature

```ts
function decodeBase64Url(input: string, encoding: TextEncoding): string;
```

Defined in: [decode-base-64-url.ts:26](https://github.com/technobuddha/library/blob/main/src/decode-base-64-url.ts#L26)

Decodes a string of data which has been encoded using
[Base64Url](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.

You can use the [encodeBase64Url](encodeBase64Url.md) method to encode and transmit data which may otherwise cause
communication problems, then transmit it and use the `decodeBase64Url` method to decode the data again.
For example, you can encode, transmit, and decode control characters such as ASCII values
0 through 31.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | A string containing the Base64 encoded data to decode. |
| `encoding` | [`TextEncoding`](../Unicode/TextEncoding.md) | - |

### Returns

`string`

An ASCII string containing decoded dat

### Remarks

Whitespace within the Base64 encoded string is ignored.

### Throws

`TypeError` If the input string is not correctly encoded.

### Example

```typescript
decodeBase64Url('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
```

