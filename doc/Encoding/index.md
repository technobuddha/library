<!-- markdownlint-disable -->

# @technobuddha/library

## Encoding

### Binary

| Name | Description |
| ------ | ------ |
| [BinaryEncoding](BinaryEncoding.md) | The binary encoding to use |
| [BinaryObject](BinaryObject.md) | A type that represents various binary object types in JavaScript. |
| [dataURL](dataURL.md) | Convert any binary object into a data URL |
| [decodeBase64](decodeBase64.md) | Decodes a string of data which has been encoded using [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. |
| [decodeBase64Url](decodeBase64Url.md) | Decodes a string of data which has been encoded using [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding. You can use the [encodeBase64Url](encodeBase64Url.md) method to encode and transmit data which may otherwise cause communication problems, then transmit it and use the `decodeBase64Url` method to decode the data again. For example, you can encode, transmit, and decode control characters such as ASCII values 0 through 31. |
| [decodeBinary](decodeBinary.md) | Decode a string into a binary object |
| [encodeBase64](encodeBase64.md) | Creates a Base64-encoded ASCII string from a string. |
| [encodeBase64Url](encodeBase64Url.md) | Creates a Base64-encoded ASCII string from a string. |
| [encodeBinary](encodeBinary.md) | Encode an binary object into a string |

### Escaping

| Name | Description |
| ------ | ------ |
| [EscapeHtmlOptions](EscapeHtmlOptions.md) | Options for [escapeHTML](escapeHTML.md) |
| [escapeC](escapeC.md) | Escape a string for use in C/C++ |
| [escapeGraphQL](escapeGraphQL.md) | Escape a string for use in GraphQL |
| [escapeHTML](escapeHTML.md) | Escape a string for use in HTML |
| [escapeJava](escapeJava.md) | Escape a string for use in Java |
| [escapeJS](escapeJS.md) | Escape a string for use in Javascript |
| [escapePython](escapePython.md) | Escape a string for use in Python |
| [unescapeC](unescapeC.md) | Unescape a string encoded in C style |
| [unescapeHTML](unescapeHTML.md) | Unescape a string encoded in HTML |
| [unescapeJava](unescapeJava.md) | Unescape a string encoded in Java style |
| [unescapeJS](unescapeJS.md) | Unescape a string encoded in Javascript style |
| [unescapePython](unescapePython.md) | Unescape a string encoded in Python style |

### Hash

| Class | Description |
| ------ | ------ |
| [Crc32](Crc32.md) | Compute the CRC32 checksum |
| [HashBase](HashBase.md) | Class representing a generic hash algorithm implementation. |
| [Sha1](Sha1.md) | Secure Hash Algorithm, SHA-1 |
| [Sha224](Sha224.md) | Secure Hash Algorithm, SHA2 SHA-224 |
| [Sha256](Sha256.md) | Secure Hash Algorithm, SHA2 SHA-256 |
| [Sha384](Sha384.md) | Secure Hash Algorithm, SHA2 SHA-384 |
| [Sha512](Sha512.md) | Secure Hash Algorithm, SHA2 SHA-512 |
| [ShaBase](ShaBase.md) | The base class for most sha bases cryptographic hash functions |
