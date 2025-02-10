<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / encodeBase64Url

# Function: encodeBase64Url()

## Call Signature

> **encodeBase64Url**(`chars`, `encoding`): `string`

Defined in: [encode-base64.ts:116](https://github.com/technobuddha/library/blob/main/src/encode-base64.ts#L116)

Creates a Base64-encoded ASCII string from a string.

You can use this method to encode data which may otherwise cause communication problems,
transmit it, then use the [decodeBase64](decodeBase64.md) method to decode the data again. For example, you can
encode control characters such as ASCII values 0 through 31.

Before encoding, the string is converted to binary using [encodeText](encodeText.md) and the supplied ***encoding***

### Parameters

#### chars

`string`

The string to encode

#### encoding

[`Encoding`](../type-aliases/Encoding.md)

The encoding of the input string

### Returns

`string`

An ASCII string containing the Base64 representation

### Example

```typescript
encodeBase64('Hello, world!', 'utf8'); // "SGVsbG8sIHdvcmxkIQ=="
```

## Call Signature

> **encodeBase64Url**(`binary`): `string`

Defined in: [encode-base64.ts:131](https://github.com/technobuddha/library/blob/main/src/encode-base64.ts#L131)

Creates a Base64-encoded ASCII string from a binary source.

You can use this method to encode data which may otherwise cause communication problems,
transmit it, then use the [decodeBase64](decodeBase64.md) method to decode the data again. For example, you can
encode control characters such as ASCII values 0 through 31.

### Parameters

#### binary

`Uint8Array`

The *binary data* to encode

### Returns

`string`

An ASCII string containing the Base64 representation

### Example

```typescript
encodeBase64(new Uint8Array([1, 2, 3]); // "AQID"
```
