[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [mersenne-twister](../README.md) / MersenneTwister

# Class: MersenneTwister

## Constructors

### new MersenneTwister()

> **new MersenneTwister**(`seed`): [`MersenneTwister`](MersenneTwister.md)

#### Parameters

• **seed**: `number` \| `number`[] = `...`

#### Returns

[`MersenneTwister`](MersenneTwister.md)

#### Defined in

[mersenne-twister.ts:70](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L70)

## Properties

### mt

> **mt**: `Uint32Array`

#### Defined in

[mersenne-twister.ts:68](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L68)

## Methods

### genrand\_int31()

> **genrand\_int31**(): `number`

#### Returns

`number`

#### Defined in

[mersenne-twister.ts:161](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L161)

***

### genrand\_int32()

> **genrand\_int32**(): `number`

#### Returns

`number`

#### Defined in

[mersenne-twister.ts:129](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L129)

***

### genrand\_real1()

> **genrand\_real1**(): `number`

#### Returns

`number`

#### Defined in

[mersenne-twister.ts:166](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L166)

***

### genrand\_real2()

> **genrand\_real2**(): `number`

#### Returns

`number`

#### Defined in

[mersenne-twister.ts:172](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L172)

***

### genrand\_real3()

> **genrand\_real3**(): `number`

#### Returns

`number`

#### Defined in

[mersenne-twister.ts:178](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L178)

***

### genrand\_res53()

> **genrand\_res53**(): `number`

#### Returns

`number`

#### Defined in

[mersenne-twister.ts:184](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L184)

***

### init\_by\_array()

> **init\_by\_array**(`key`): `void`

#### Parameters

• **key**: `number`[]

#### Returns

`void`

#### Defined in

[mersenne-twister.ts:95](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L95)

***

### init\_genrand()

> **init\_genrand**(`seed`): `void`

#### Parameters

• **seed**: `number`

#### Returns

`void`

#### Defined in

[mersenne-twister.ts:80](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L80)

***

### setSeed()

> **setSeed**(`seed`): `void`

#### Parameters

• **seed**: `number` \| `number`[]

#### Returns

`void`

#### Defined in

[mersenne-twister.ts:74](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/mersenne-twister.ts#L74)
