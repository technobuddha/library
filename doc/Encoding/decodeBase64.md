<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / decodeBase64

# Function: decodeBase64()

## Call Signature

> **decodeBase64**(`input`: `string`): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [decode-base-64.ts:110](https://github.com/technobuddha/library/blob/main/src/decode-base-64.ts#L110)

Decodes a string of data which has been encoded using
[Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.

You can use the **decodeBase64** method to encode and transmit data which may otherwise cause
communication problems, then transmit it and use the [encodeBase64](encodeBase64.md) method to decode the data again.
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

Whitespace withing the Base64 encoded string is ignored.

### Example

```ts
atob('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
```

### Throws

`TypeError` If the input string is not correctly encoded.

## Call Signature

> **decodeBase64**(`input`: `string`, `encoding`: [`TextEncoding`](../Unicode/TextEncoding.md)): `string`

Defined in: [decode-base-64.ts:111](https://github.com/technobuddha/library/blob/main/src/decode-base-64.ts#L111)

Decodes a string of data which has been encoded using
[Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.

You can use the **decodeBase64** method to encode and transmit data which may otherwise cause
communication problems, then transmit it and use the [encodeBase64](encodeBase64.md) method to decode the data again.
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

Whitespace withing the Base64 encoded string is ignored.

### Example

```ts
atob('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
```

### Throws

`TypeError` If the input string is not correctly encoded.
