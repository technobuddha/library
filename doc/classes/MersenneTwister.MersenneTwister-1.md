[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / [MersenneTwister](../modules/MersenneTwister.md) / MersenneTwister

# Class: MersenneTwister

[MersenneTwister](../modules/MersenneTwister.md).MersenneTwister

## Table of contents

### Constructors

- [constructor](MersenneTwister.MersenneTwister-1.md#constructor)

### Properties

- [mt](MersenneTwister.MersenneTwister-1.md#mt)

### Methods

- [genrand\_int31](MersenneTwister.MersenneTwister-1.md#genrand_int31)
- [genrand\_int32](MersenneTwister.MersenneTwister-1.md#genrand_int32)
- [genrand\_real1](MersenneTwister.MersenneTwister-1.md#genrand_real1)
- [genrand\_real2](MersenneTwister.MersenneTwister-1.md#genrand_real2)
- [genrand\_real3](MersenneTwister.MersenneTwister-1.md#genrand_real3)
- [genrand\_res53](MersenneTwister.MersenneTwister-1.md#genrand_res53)
- [init\_by\_array](MersenneTwister.MersenneTwister-1.md#init_by_array)
- [init\_genrand](MersenneTwister.MersenneTwister-1.md#init_genrand)
- [setSeed](MersenneTwister.MersenneTwister-1.md#setseed)

## Constructors

### constructor

• **new MersenneTwister**(`seed?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `number` \| `number`[] |

#### Defined in

[MersenneTwister.ts:65](../../src/MersenneTwister.ts#L65)

## Properties

### mt

• **mt**: `Uint32Array`

#### Defined in

[MersenneTwister.ts:63](../../src/MersenneTwister.ts#L63)

## Methods

### genrand\_int31

▸ **genrand_int31**(): `number`

#### Returns

`number`

#### Defined in

[MersenneTwister.ts:145](../../src/MersenneTwister.ts#L145)

___

### genrand\_int32

▸ **genrand_int32**(): `number`

#### Returns

`number`

#### Defined in

[MersenneTwister.ts:113](../../src/MersenneTwister.ts#L113)

___

### genrand\_real1

▸ **genrand_real1**(): `number`

#### Returns

`number`

#### Defined in

[MersenneTwister.ts:150](../../src/MersenneTwister.ts#L150)

___

### genrand\_real2

▸ **genrand_real2**(): `number`

#### Returns

`number`

#### Defined in

[MersenneTwister.ts:156](../../src/MersenneTwister.ts#L156)

___

### genrand\_real3

▸ **genrand_real3**(): `number`

#### Returns

`number`

#### Defined in

[MersenneTwister.ts:162](../../src/MersenneTwister.ts#L162)

___

### genrand\_res53

▸ **genrand_res53**(): `number`

#### Returns

`number`

#### Defined in

[MersenneTwister.ts:168](../../src/MersenneTwister.ts#L168)

___

### init\_by\_array

▸ **init_by_array**(`key`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `number`[] |

#### Returns

`void`

#### Defined in

[MersenneTwister.ts:91](../../src/MersenneTwister.ts#L91)

___

### init\_genrand

▸ **init_genrand**(`seed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `number` |

#### Returns

`void`

#### Defined in

[MersenneTwister.ts:77](../../src/MersenneTwister.ts#L77)

___

### setSeed

▸ **setSeed**(`seed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `number` \| `number`[] |

#### Returns

`void`

#### Defined in

[MersenneTwister.ts:69](../../src/MersenneTwister.ts#L69)
