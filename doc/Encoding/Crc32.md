<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / Crc32

# Class: Crc32

Defined in: [crc-32.ts:58](https://github.com/technobuddha/library/blob/main/src/crc-32.ts#L58)

Compute the CRC32 checksum

## Extends

- [`HashBase`](HashBase.md)

## Constructors

### Constructor

```ts
new Crc32(): Crc32;
```

Defined in: [crc-32.ts:68](https://github.com/technobuddha/library/blob/main/src/crc-32.ts#L68)

Creates a new CRC32 hash instance and initializes its internal state.

#### Returns

`Crc32`

#### Remarks

The CRC value is initialized to -1, as required by the CRC32 algorithm specification.
Use [update](#update) to process data and [digest](#digest) to obtain the final hash value.

#### Overrides

[`HashBase`](HashBase.md).[`constructor`](HashBase.md#constructor)

## Methods

### digest()

#### Call Signature

```ts
digest(): Uint8Array;
```

Defined in: [crc-32.ts:91](https://github.com/technobuddha/library/blob/main/src/crc-32.ts#L91)

The output is returned as a `Uint8Array`.

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The hash digest as a `Uint8Array`

##### Overrides

[`HashBase`](HashBase.md).[`digest`](HashBase.md#digest)

#### Call Signature

```ts
digest(encoding: BinaryEncoding): string;
```

Defined in: [crc-32.ts:92](https://github.com/technobuddha/library/blob/main/src/crc-32.ts#L92)

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

##### Overrides

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

Defined in: [crc-32.ts:73](https://github.com/technobuddha/library/blob/main/src/crc-32.ts#L73)

Updates the hash with the given binary data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \| [`TypedArray`](../Utility/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\> | The data to update the hash with, as a TypedArray or ArrayBuffer. |

##### Returns

`this`

The hash instance for method chaining.

##### Overrides

[`HashBase`](HashBase.md).[`update`](HashBase.md#update)

#### Call Signature

```ts
update(data: string, encoding?: TextEncoding): this;
```

Defined in: [crc-32.ts:74](https://github.com/technobuddha/library/blob/main/src/crc-32.ts#L74)

Updates the hash with the given string data.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `string` | The string data to update the hash with. |
| `encoding?` | [`TextEncoding`](../Unicode/TextEncoding.md) | Optional text encoding of the input string (e.g., 'utf8'). |

##### Returns

`this`

The hash instance for method chaining.

##### Overrides

[`HashBase`](HashBase.md).[`update`](HashBase.md#update)

