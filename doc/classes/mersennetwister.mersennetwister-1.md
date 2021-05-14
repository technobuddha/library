[@technobuddha/library](../..) / [Modules](../Modules.md) / [MersenneTwister](../modules/mersennetwister.md) / MersenneTwister

# Class: MersenneTwister

[MersenneTwister](../modules/mersennetwister.md).MersenneTwister

## Table of contents

### Constructors

- [constructor](mersennetwister.mersennetwister-1.md#constructor)

### Properties

- [mt](mersennetwister.mersennetwister-1.md#mt)

### Methods

- [genrand\_int31](mersennetwister.mersennetwister-1.md#genrand_int31)
- [genrand\_int32](mersennetwister.mersennetwister-1.md#genrand_int32)
- [genrand\_real1](mersennetwister.mersennetwister-1.md#genrand_real1)
- [genrand\_real2](mersennetwister.mersennetwister-1.md#genrand_real2)
- [genrand\_real3](mersennetwister.mersennetwister-1.md#genrand_real3)
- [genrand\_res53](mersennetwister.mersennetwister-1.md#genrand_res53)
- [init\_by\_array](mersennetwister.mersennetwister-1.md#init_by_array)
- [init\_genrand](mersennetwister.mersennetwister-1.md#init_genrand)
- [setSeed](mersennetwister.mersennetwister-1.md#setseed)

## Constructors

### constructor

\+ **new MersenneTwister**(`seed?`: *number* \| *number*[]): [*MersenneTwister*](mersennetwister.mersennetwister-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | *number* \| *number*[] |

**Returns:** [*MersenneTwister*](mersennetwister.mersennetwister-1.md)

Defined in: [MersenneTwister.ts:63](../../src/MersenneTwister.ts#L63)

## Properties

### mt

• **mt**: *Uint32Array*

Defined in: [packages/library/src/MersenneTwister.ts:63](../../src/MersenneTwister.ts#L63)

## Methods

### genrand\_int31

▸ **genrand_int31**(): *number*

**Returns:** *number*

Defined in: [packages/library/src/MersenneTwister.ts:145](../../src/MersenneTwister.ts#L145)

___

### genrand\_int32

▸ **genrand_int32**(): *number*

**Returns:** *number*

Defined in: [packages/library/src/MersenneTwister.ts:113](../../src/MersenneTwister.ts#L113)

___

### genrand\_real1

▸ **genrand_real1**(): *number*

**Returns:** *number*

Defined in: [packages/library/src/MersenneTwister.ts:150](../../src/MersenneTwister.ts#L150)

___

### genrand\_real2

▸ **genrand_real2**(): *number*

**Returns:** *number*

Defined in: [packages/library/src/MersenneTwister.ts:156](../../src/MersenneTwister.ts#L156)

___

### genrand\_real3

▸ **genrand_real3**(): *number*

**Returns:** *number*

Defined in: [packages/library/src/MersenneTwister.ts:162](../../src/MersenneTwister.ts#L162)

___

### genrand\_res53

▸ **genrand_res53**(): *number*

**Returns:** *number*

Defined in: [packages/library/src/MersenneTwister.ts:168](../../src/MersenneTwister.ts#L168)

___

### init\_by\_array

▸ **init_by_array**(`key`: *number*[]): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *number*[] |

**Returns:** *void*

Defined in: [packages/library/src/MersenneTwister.ts:91](../../src/MersenneTwister.ts#L91)

___

### init\_genrand

▸ **init_genrand**(`seed`: *number*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | *number* |

**Returns:** *void*

Defined in: [packages/library/src/MersenneTwister.ts:77](../../src/MersenneTwister.ts#L77)

___

### setSeed

▸ **setSeed**(`seed`: *number* \| *number*[]): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | *number* \| *number*[] |

**Returns:** *void*

Defined in: [packages/library/src/MersenneTwister.ts:69](../../src/MersenneTwister.ts#L69)
