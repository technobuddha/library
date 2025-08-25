<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / ShaBase

# Abstract Class: ShaBase

Defined in: [sha-base.ts:15](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L15)

The base class for most sha bases cryptographic hash functions

## Extended by

- [`Sha1`](Sha1.md)
- [`Sha224`](Sha224.md)
- [`Sha256`](Sha256.md)
- [`Sha384`](Sha384.md)
- [`Sha512`](Sha512.md)

## Implements

- [`HashBase`](HashBase.md)

## Constructors

### Constructor

```ts
new ShaBase(blockSize: number, finalSize: number): ShaBase;
```

Defined in: [sha-base.ts:47](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L47)

Creates a new instance of the hash base class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `blockSize` | `number` | The size of the internal block buffer in bytes. |
| `finalSize` | `number` | The size of the final hash output in bytes. |

#### Returns

`ShaBase`

## Methods

### digest()

#### Call Signature

```ts
digest(): Uint8Array;
```

Defined in: [sha-base.ts:78](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L78)

The output is returned as a `Uint8Array`.

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The hash digest as a `Uint8Array`

##### Implementation of

[`HashBase`](HashBase.md).[`digest`](HashBase.md#digest)

#### Call Signature

```ts
digest(encoding: BinaryEncoding): string;
```

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

##### Implementation of

[`HashBase`](HashBase.md).[`digest`](HashBase.md#digest)

***

### update()

#### Call Signature

```ts
update(data: 
  | TypedArray
  | ArrayBuffer
  | ArrayLike<number>): this;
```

Defined in: [sha-base.ts:120](https://github.com/technobuddha/library/blob/main/src/sha-base.ts#L120)

Updates the hash with the given binary data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \| [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\> | The data to update the hash with, as a TypedArray or ArrayBuffer. |

##### Returns

`this`

The hash instance for method chaining.

##### Implementation of

[`HashBase`](HashBase.md).[`update`](HashBase.md#update)

#### Call Signature

```ts
update(data: string, encoding?: TextEncoding): this;
```

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

##### Implementation of

[`HashBase`](HashBase.md).[`update`](HashBase.md#update)

