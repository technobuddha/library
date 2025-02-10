<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / MersenneTwister

# Class: MersenneTwister

Defined in: [mersenne-twister.ts:65](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L65)

## Constructors

### new MersenneTwister()

> **new MersenneTwister**(`seed`): [`MersenneTwister`](MersenneTwister.md)

Defined in: [mersenne-twister.ts:69](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L69)

#### Parameters

##### seed

`number` | `number`[]

#### Returns

[`MersenneTwister`](MersenneTwister.md)

## Properties

### mt

> **mt**: `Uint32Array`\<`ArrayBuffer`\>

Defined in: [mersenne-twister.ts:67](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L67)

## Methods

### genrandInt31()

> **genrandInt31**(): `number`

Defined in: [mersenne-twister.ts:179](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L179)

#### Returns

`number`

***

### genrandInt32()

> **genrandInt32**(): `number`

Defined in: [mersenne-twister.ts:137](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L137)

#### Returns

`number`

***

### genrandReal1()

> **genrandReal1**(): `number`

Defined in: [mersenne-twister.ts:185](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L185)

#### Returns

`number`

***

### genrandReal2()

> **genrandReal2**(): `number`

Defined in: [mersenne-twister.ts:191](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L191)

#### Returns

`number`

***

### genrandReal3()

> **genrandReal3**(): `number`

Defined in: [mersenne-twister.ts:197](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L197)

#### Returns

`number`

***

### genrandRes53()

> **genrandRes53**(): `number`

Defined in: [mersenne-twister.ts:203](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L203)

#### Returns

`number`

***

### initByArray()

> **initByArray**(`key`): `void`

Defined in: [mersenne-twister.ts:99](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L99)

#### Parameters

##### key

`number`[]

#### Returns

`void`

***

### initGenrand()

> **initGenrand**(`seed`): `void`

Defined in: [mersenne-twister.ts:82](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L82)

#### Parameters

##### seed

`number`

#### Returns

`void`

***

### setSeed()

> **setSeed**(`seed`): `void`

Defined in: [mersenne-twister.ts:73](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L73)

#### Parameters

##### seed

`number` | `number`[]

#### Returns

`void`
