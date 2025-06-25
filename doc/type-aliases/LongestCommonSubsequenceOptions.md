<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / LongestCommonSubsequenceOptions

# Type Alias: LongestCommonSubsequenceOptions\<T\>

> **LongestCommonSubsequenceOptions**\<`T`\> = \{ `collect?`: `T`; `compare?`: `boolean`; \}

Defined in: [longest-common-subsequence.ts:7](https://github.com/technobuddha/library/blob/main/src/longest-common-subsequence.ts#L7)

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Methods

### collect()?

> `optional` **collect**(`this`: `void`, `i1`: `number`, `i2`: `number`): `T`

Defined in: [longest-common-subsequence.ts:19](https://github.com/technobuddha/library/blob/main/src/longest-common-subsequence.ts#L19)

Function used to decide what to return
as a result subsequence. It accepts 2 arguments: index of common element
in the first array and index in the second. The default function returns
element from the first array.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `this` | `void` |
| `i1` | `number` |
| `i2` | `number` |

#### Returns

`T`

***

### compare()?

> `optional` **compare**(`this`: `void`, `a`: `T`, `b`: `T`): `boolean`

Defined in: [longest-common-subsequence.ts:12](https://github.com/technobuddha/library/blob/main/src/longest-common-subsequence.ts#L12)

Function that acts as a custom comparator
for the array objects. Function should return true if objects are equal, otherwise false.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `this` | `void` |
| `a` | `T` |
| `b` | `T` |

#### Returns

`boolean`
