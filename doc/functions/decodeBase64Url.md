<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / decodeBase64Url

# Function: decodeBase64Url()

## Call Signature

> **decodeBase64Url**(`input`): `Uint8Array`

Defined in: [decode-base64.ts:107](https://github.com/technobuddha/library/blob/main/src/decode-base64.ts#L107)

Decodes a string of data which has been encoded using
[Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.
You can use the btoa() method to encode and transmit data which may otherwise cause
communication problems, then transmit it and use the atob() method to decode the data again.
For example, you can encode, transmit, and decode control characters such as ASCII values
0 through 31.

### Parameters

#### input

`string`

A string containing the Base64 encoded data to decode.

### Returns

`Uint8Array`

An ASCII string containing decoded dat

### Remarks

Whitespace withing the Base64 encoded string is ignored.

### Example

```typescript
atob('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
```

### Throws

`TypeError` If the input string is not correctly encoded.

## Call Signature

> **decodeBase64Url**(`input`, `encoding`): `string`

Defined in: [decode-base64.ts:108](https://github.com/technobuddha/library/blob/main/src/decode-base64.ts#L108)

Decodes a string of data which has been encoded using
[Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding.
You can use the btoa() method to encode and transmit data which may otherwise cause
communication problems, then transmit it and use the atob() method to decode the data again.
For example, you can encode, transmit, and decode control characters such as ASCII values
0 through 31.

### Parameters

#### input

`string`

A string containing the Base64 encoded data to decode.

#### encoding

[`Encoding`](../type-aliases/Encoding.md)

### Returns

`string`

An ASCII string containing decoded dat

### Remarks

Whitespace withing the Base64 encoded string is ignored.

### Example

```typescript
atob('SGVsbG8sIHdvcmxkIQ=='); // "Hello, world!"
```

### Throws

`TypeError` If the input string is not correctly encoded.
