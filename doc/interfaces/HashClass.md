<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / HashClass

# Interface: HashClass

Defined in: [hash.ts:8](https://github.com/technobuddha/library/blob/main/src/hash.ts#L8)

## Methods

### digest()

#### Call Signature

> **digest**(): `Uint8Array`

Defined in: [hash.ts:9](https://github.com/technobuddha/library/blob/main/src/hash.ts#L9)

##### Returns

`Uint8Array`

#### Call Signature

> **digest**(`encoding`): `string`

Defined in: [hash.ts:10](https://github.com/technobuddha/library/blob/main/src/hash.ts#L10)

##### Parameters

###### encoding

[`BinaryEncoding`](../type-aliases/BinaryEncoding.md)

##### Returns

`string`

***

### update()

#### Call Signature

> **update**(`data`): `this`

Defined in: [hash.ts:11](https://github.com/technobuddha/library/blob/main/src/hash.ts#L11)

##### Parameters

###### data

`ArrayBuffer` | `TypedArray`

##### Returns

`this`

#### Call Signature

> **update**(`data`, `encoding`?): `this`

Defined in: [hash.ts:12](https://github.com/technobuddha/library/blob/main/src/hash.ts#L12)

##### Parameters

###### data

`string`

###### encoding?

[`Encoding`](../type-aliases/Encoding.md)

##### Returns

`this`
