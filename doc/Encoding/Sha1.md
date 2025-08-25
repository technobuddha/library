<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / Sha1

# Class: Sha1

Defined in: [sha-1.ts:48](https://github.com/technobuddha/library/blob/main/src/sha-1.ts#L48)

Secure Hash Algorithm, SHA-1

## Extends

- [`ShaBase`](ShaBase.md)

## Constructors

### Constructor

> **new Sha1**(): `Sha1`

Defined in: [sha-1.ts:64](https://github.com/technobuddha/library/blob/main/src/sha-1.ts#L64)

Creates a new SHA-1 hash instance and initializes its internal state.

#### Returns

`Sha1`

#### Remarks

The internal state variables are set to the initial SHA-1 constants as specified
in FIPS PUB 180-1. Use [update](#update) to process data and [digest](#digest) to retrieve the
final hash value.

#### Overrides

[`ShaBase`](ShaBase.md).[`constructor`](ShaBase.md#constructor)

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [sha-base.ts:78](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L78)

The output is returned as a `Uint8Array`.

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The hash digest as a `Uint8Array`

##### Inherited from

[`ShaBase`](ShaBase.md).[`digest`](ShaBase.md#digest)

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](BinaryEncoding.md)): `string`

Defined in: [sha-base.ts:79](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L79)

Finalizes the hash computation and returns the resulting hash digest.
This method performs any necessary padding and processes the final block
of data according to the hash algorithm's specification.

The output is encoded as a string in the specified binary encoding.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `encoding` | [`BinaryEncoding`](BinaryEncoding.md) | Optional. The encoding to use for the output digest (e.g., 'hex', 'base64'). |

##### Returns

`string`

An encoded string, depending on the `encoding` parameter.

##### Inherited from

[`ShaBase`](ShaBase.md).[`digest`](ShaBase.md#digest)

***

### update()

#### Call Signature

> **update**(`data`: [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\>): `this`

Defined in: [sha-base.ts:120](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L120)

Updates the hash with the given binary data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\> | The data to update the hash with, as a TypedArray or ArrayBuffer. |

##### Returns

`this`

The hash instance for method chaining.

##### Inherited from

[`ShaBase`](ShaBase.md).[`update`](ShaBase.md#update)

#### Call Signature

> **update**(`data`: `string`, `encoding?`: [`TextEncoding`](../Unicode/TextEncoding.md)): `this`

Defined in: [sha-base.ts:121](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L121)

Updates the hash with the given string data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` | The string data to update the hash with. |
| `encoding?` | [`TextEncoding`](../Unicode/TextEncoding.md) | Optional text encoding of the input string (e.g., 'utf8'). |

##### Returns

`this`

The hash instance for method chaining.

##### Inherited from

[`ShaBase`](ShaBase.md).[`update`](ShaBase.md#update)

