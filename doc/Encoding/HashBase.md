<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / HashBase

# Abstract Class: HashBase

Defined in: [hash-base.ts:21](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L21)

Abstract base class for hash algorithm implementations.

Provides a standard interface for updating hash state with data and
retrieving the final digest in various formats. Concrete subclasses
must implement the `update` and `digest` methods according to the
specifics of the hash algorithm.

## Remarks

- The `update` methods allows chaining for incremental hashing.
- The `digest` methods finalize the hash computation and return the result
  either as a `Uint8Array` or as an encoded string.

## Extended by

- [`Crc32`](Crc32.md)
- [`ShaBase`](ShaBase.md)

## Constructors

### Constructor

```ts
new HashBase(): HashBase;
```

#### Returns

`HashBase`

## Methods

### digest()

#### Call Signature

```ts
abstract digest(): Uint8Array;
```

Defined in: [hash-base.ts:29](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L29)

Finalizes the hash computation and returns the resulting hash digest.
This method performs any necessary padding and processes the final block
of data according to the hash algorithm's specification.

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The hash digest

#### Call Signature

```ts
abstract digest(encoding: BinaryEncoding): string;
```

Defined in: [hash-base.ts:37](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L37)

Finalizes the hash computation and returns the resulting hash digest.
This method performs any necessary padding and processes the final block
of data according to the hash algorithm's specification.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `encoding` | [`BinaryEncoding`](BinaryEncoding.md) | Optional. The encoding to use for the output digest (e.g., 'hex', 'base64'). |

##### Returns

`string`

An encoded string, depending on the `encoding` parameter.

***

### update()

#### Call Signature

```ts
abstract update(data: 
  | TypedArray
  | ArrayBuffer): this;
```

Defined in: [hash-base.ts:44](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L44)

Updates the hash with the given binary data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \| [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | The data to update the hash with, as a TypedArray or ArrayBuffer. |

##### Returns

`this`

The hash instance for method chaining.

#### Call Signature

```ts
abstract update(data: string, encoding?: TextEncoding): this;
```

Defined in: [hash-base.ts:52](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L52)

Updates the hash with the given string data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` | The string data to update the hash with. |
| `encoding?` | [`TextEncoding`](../Unicode/TextEncoding.md) | Optional text encoding of the input string (e.g., 'utf8'). |

##### Returns

`this`

The hash instance for method chaining.

