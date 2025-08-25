<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / HashBase

# Abstract Class: HashBase

Defined in: [hash-base.ts:15](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L15)

Class representing a generic hash algorithm implementation.

## Remarks

This class defines the contract for hash classes, supporting
updating the hash with data and producing a digest in various formats.

## Extended by

- [`Crc32`](Crc32.md)

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

Defined in: [hash-base.ts:21](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L21)

The output is returned as a `Uint8Array`.

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The hash digest as a `Uint8Array`

#### Call Signature

```ts
abstract digest(encoding: BinaryEncoding): string;
```

Defined in: [hash-base.ts:33](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L33)

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

***

### update()

#### Call Signature

```ts
abstract update(data: 
  | TypedArray
  | ArrayBuffer): this;
```

Defined in: [hash-base.ts:40](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L40)

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

Defined in: [hash-base.ts:48](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L48)

Updates the hash with the given string data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` | The string data to update the hash with. |
| `encoding?` | [`TextEncoding`](../Unicode/TextEncoding.md) | Optional text encoding of the input string (e.g., 'utf8'). |

##### Returns

`this`

The hash instance for method chaining.

