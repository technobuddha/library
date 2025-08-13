<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / HashClass

# Interface: HashClass

Defined in: [hash-base.ts:13](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L13)

The base interface for hash classes

## Methods

### digest()

#### Call Signature

> **digest**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [hash-base.ts:14](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L14)

##### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

#### Call Signature

> **digest**(`encoding`: [`BinaryEncoding`](../type-aliases/BinaryEncoding.md)): `string`

Defined in: [hash-base.ts:15](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L15)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `encoding` | [`BinaryEncoding`](../type-aliases/BinaryEncoding.md) |

##### Returns

`string`

***

### update()

#### Call Signature

> **update**(`data`: [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| [`TypedArray`](../type-aliases/TypedArray.md)): `this`

Defined in: [hash-base.ts:16](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L16)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| [`TypedArray`](../type-aliases/TypedArray.md) |

##### Returns

`this`

#### Call Signature

> **update**(`data`: `string`, `encoding?`: [`TextEncoding`](../type-aliases/TextEncoding.md)): `this`

Defined in: [hash-base.ts:17](https://github.com/technobuddha/library/blob/main/src/hash-base.ts#L17)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `string` |
| `encoding?` | [`TextEncoding`](../type-aliases/TextEncoding.md) |

##### Returns

`this`
