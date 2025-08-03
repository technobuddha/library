<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / MersenneTwister

# Class: MersenneTwister

Defined in: [mersenne-twister.ts:72](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L72)

## Constructors

### Constructor

> **new MersenneTwister**(`seed`: `number` \| `number`[]): `MersenneTwister`

Defined in: [mersenne-twister.ts:76](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L76)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` \| `number`[] |

#### Returns

`MersenneTwister`

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="mt"></a> `mt` | `public` | [`Uint32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\> | [mersenne-twister.ts:74](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L74) |

## Methods

### genrandInt31()

> **genrandInt31**(): `number`

Defined in: [mersenne-twister.ts:174](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L174)

#### Returns

`number`

***

### genrandInt32()

> **genrandInt32**(): `number`

Defined in: [mersenne-twister.ts:142](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L142)

#### Returns

`number`

***

### genrandReal1()

> **genrandReal1**(): `number`

Defined in: [mersenne-twister.ts:179](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L179)

#### Returns

`number`

***

### genrandReal2()

> **genrandReal2**(): `number`

Defined in: [mersenne-twister.ts:185](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L185)

#### Returns

`number`

***

### genrandReal3()

> **genrandReal3**(): `number`

Defined in: [mersenne-twister.ts:191](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L191)

#### Returns

`number`

***

### genrandRes53()

> **genrandRes53**(): `number`

Defined in: [mersenne-twister.ts:197](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L197)

#### Returns

`number`

***

### initByArray()

> **initByArray**(`key`: `number`[]): `void`

Defined in: [mersenne-twister.ts:106](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L106)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `number`[] |

#### Returns

`void`

***

### initGenrand()

> **initGenrand**(`seed`: `number`): `void`

Defined in: [mersenne-twister.ts:89](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L89)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` |

#### Returns

`void`

***

### setSeed()

> **setSeed**(`seed`: `number` \| `number`[]): `void`

Defined in: [mersenne-twister.ts:80](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L80)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` \| `number`[] |

#### Returns

`void`
