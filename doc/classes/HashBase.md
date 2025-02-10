[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / HashBase

# Class: `abstract` HashBase

Defined in: [hash.ts:15](https://github.com/technobuddha/library/blob/main/src/hash.ts#L15)

## Implements

- [`HashClass`](../interfaces/HashClass.md)

## Constructors

### new HashBase()

> **new HashBase**(`blockSize`, `finalSize`): [`HashBase`](HashBase.md)

Defined in: [hash.ts:21](https://github.com/technobuddha/library/blob/main/src/hash.ts#L21)

#### Parameters

##### blockSize

`number`

##### finalSize

`number`

#### Returns

[`HashBase`](HashBase.md)

## Properties

### block

> `protected` `readonly` **block**: `Uint8Array`

Defined in: [hash.ts:16](https://github.com/technobuddha/library/blob/main/src/hash.ts#L16)

***

### blockSize

> `protected` `readonly` **blockSize**: `number`

Defined in: [hash.ts:17](https://github.com/technobuddha/library/blob/main/src/hash.ts#L17)

***

### finalSize

> `protected` `readonly` **finalSize**: `number`

Defined in: [hash.ts:18](https://github.com/technobuddha/library/blob/main/src/hash.ts#L18)

## Methods

### digest()

#### Call Signature

> **digest**(): `Uint8Array`

Defined in: [hash.ts:32](https://github.com/technobuddha/library/blob/main/src/hash.ts#L32)

##### Returns

`Uint8Array`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

#### Call Signature

> **digest**(`encoding`): `string`

Defined in: [hash.ts:33](https://github.com/technobuddha/library/blob/main/src/hash.ts#L33)

##### Parameters

###### encoding

[`BinaryEncoding`](../type-aliases/BinaryEncoding.md)

##### Returns

`string`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`digest`](../interfaces/HashClass.md#digest)

***

### hash()

> `abstract` `protected` **hash**(): `Uint8Array`

Defined in: [hash.ts:28](https://github.com/technobuddha/library/blob/main/src/hash.ts#L28)

#### Returns

`Uint8Array`

***

### update()

#### Call Signature

> **update**(`data`): `this`

Defined in: [hash.ts:74](https://github.com/technobuddha/library/blob/main/src/hash.ts#L74)

##### Parameters

###### data

`ArrayBuffer` | `TypedArray`

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)

#### Call Signature

> **update**(`data`, `encoding`?): `this`

Defined in: [hash.ts:75](https://github.com/technobuddha/library/blob/main/src/hash.ts#L75)

##### Parameters

###### data

`string`

###### encoding?

[`Encoding`](../type-aliases/Encoding.md)

##### Returns

`this`

##### Implementation of

[`HashClass`](../interfaces/HashClass.md).[`update`](../interfaces/HashClass.md#update)

***

### updateCounters()

> `abstract` `protected` **updateCounters**(`buffer`): `void`

Defined in: [hash.ts:30](https://github.com/technobuddha/library/blob/main/src/hash.ts#L30)

#### Parameters

##### buffer

`Uint8Array`

#### Returns

`void`
