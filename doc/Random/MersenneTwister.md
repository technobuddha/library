<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Random](./index.md) / MersenneTwister

# Class: MersenneTwister

Defined in: [mersenne-twister.ts:105](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L105)

Implements the Mersenne Twister pseudorandom number generator (MT19937).

The Mersenne Twister is a widely used PRNG known for its long period (2^19937−1),
high performance, and high-quality randomness. This class provides methods to seed
the generator and produce random numbers in various formats and intervals.

## Example

```ts
const mt = new MersenneTwister(1234);
const randomInt = mt.genrandInt32();
const randomFloat = mt.genrandReal2();
```

## Remarks

- The generator can be seeded with a single number or an array of numbers.
- Methods are provided to generate 32-bit and 31-bit integers, as well as floating-point numbers
  in different intervals.
- This implementation is based on the original C code by Makoto Matsumoto and Takuji Nishimura.

## See

 - https://en.wikipedia.org/wiki/Mersenne_Twister
 - http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html

## Constructors

### Constructor

```ts
new MersenneTwister(seed: number | number[]): MersenneTwister;
```

Defined in: [mersenne-twister.ts:109](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L109)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` \| `number`[] |

#### Returns

`MersenneTwister`

## Properties

| Property | Modifier | Type | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="mt"></a> `mt` | `public` | [`Uint32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\> | [mersenne-twister.ts:107](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L107) |

## Methods

### genrandInt31()

```ts
genrandInt31(): number;
```

Defined in: [mersenne-twister.ts:207](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L207)

#### Returns

`number`

***

### genrandInt32()

```ts
genrandInt32(): number;
```

Defined in: [mersenne-twister.ts:175](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L175)

#### Returns

`number`

***

### genrandReal1()

```ts
genrandReal1(): number;
```

Defined in: [mersenne-twister.ts:212](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L212)

#### Returns

`number`

***

### genrandReal2()

```ts
genrandReal2(): number;
```

Defined in: [mersenne-twister.ts:218](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L218)

#### Returns

`number`

***

### genrandReal3()

```ts
genrandReal3(): number;
```

Defined in: [mersenne-twister.ts:224](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L224)

#### Returns

`number`

***

### genrandRes53()

```ts
genrandRes53(): number;
```

Defined in: [mersenne-twister.ts:230](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L230)

#### Returns

`number`

***

### initByArray()

```ts
initByArray(key: number[]): void;
```

Defined in: [mersenne-twister.ts:139](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L139)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `number`[] |

#### Returns

`void`

***

### initGenrand()

```ts
initGenrand(seed: number): void;
```

Defined in: [mersenne-twister.ts:122](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L122)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` |

#### Returns

`void`

***

### setSeed()

```ts
setSeed(seed: number | number[]): void;
```

Defined in: [mersenne-twister.ts:113](https://github.com/technobuddha/library/blob/main/src/mersenne-twister.ts#L113)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | `number` \| `number`[] |

#### Returns

`void`

