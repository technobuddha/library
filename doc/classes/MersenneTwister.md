<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / MersenneTwister

# Class: MersenneTwister

Defined in: [mersenne-twister.ts:70](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L70)

## Constructors

### Constructor

> **new MersenneTwister**(`seed`: `number` \| `number`[]): `MersenneTwister`

Defined in: [mersenne-twister.ts:74](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L74)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` \| `number`[] |

#### Returns

`MersenneTwister`

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="mt"></a> `mt` | `public` | [`Uint32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\> | [mersenne-twister.ts:72](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L72) |

## Methods

### genrandInt31()

> **genrandInt31**(): `number`

Defined in: [mersenne-twister.ts:171](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L171)

#### Returns

`number`

***

### genrandInt32()

> **genrandInt32**(): `number`

Defined in: [mersenne-twister.ts:139](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L139)

#### Returns

`number`

***

### genrandReal1()

> **genrandReal1**(): `number`

Defined in: [mersenne-twister.ts:176](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L176)

#### Returns

`number`

***

### genrandReal2()

> **genrandReal2**(): `number`

Defined in: [mersenne-twister.ts:182](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L182)

#### Returns

`number`

***

### genrandReal3()

> **genrandReal3**(): `number`

Defined in: [mersenne-twister.ts:188](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L188)

#### Returns

`number`

***

### genrandRes53()

> **genrandRes53**(): `number`

Defined in: [mersenne-twister.ts:194](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L194)

#### Returns

`number`

***

### initByArray()

> **initByArray**(`key`: `number`[]): `void`

Defined in: [mersenne-twister.ts:103](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L103)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `number`[] |

#### Returns

`void`

***

### initGenrand()

> **initGenrand**(`seed`: `number`): `void`

Defined in: [mersenne-twister.ts:87](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L87)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` |

#### Returns

`void`

***

### setSeed()

> **setSeed**(`seed`: `number` \| `number`[]): `void`

Defined in: [mersenne-twister.ts:78](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L78)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` \| `number`[] |

#### Returns

`void`
