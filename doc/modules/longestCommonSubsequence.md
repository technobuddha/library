[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / longestCommonSubsequence

# Module: longestCommonSubsequence

## Table of contents

### References

- [default](longestCommonSubsequence.md#default)

### Type aliases

- [Options](longestCommonSubsequence.md#options)

### Functions

- [longestCommonSubsequence](longestCommonSubsequence.md#longestcommonsubsequence)

## References

### default

Renames and exports: [longestCommonSubsequence](longestCommonSubsequence.md#longestcommonsubsequence)

## Type aliases

### Options

Ƭ **Options**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collect?` | (`i1`: `number`, `i2`: `number`) => `T` |
| `compare?` | (`a`: `T`, `b`: `T`) => `boolean` |

#### Defined in

[longestCommonSubsequence.ts:3](../../src/longestCommonSubsequence.ts#L3)

## Functions

### longestCommonSubsequence

▸ **longestCommonSubsequence**<`T`\>(`array1`, `array2`, `__namedParameters?`): `T`[]

Implementation of Longest Common Subsequence problem.
http://en.wikipedia.org/wiki/Longest_common_subsequence

Returns the longest possible array that is subarray of both of given arrays.

**`default`** compare equality comparison

**`default`** collect basic collector

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array1` | `ArrayLike`<`T`\> | First array of objects. |
| `array2` | `ArrayLike`<`T`\> | Second array of objects. |
| `__namedParameters` | [`Options`](longestCommonSubsequence.md#options)<`T`\> | see [Options](longestCommonSubsequence.md#options) |

#### Returns

`T`[]

A list of objects that are common to both arrays
such that there is no common subsequence with size greater than the
length of the list.

#### Defined in

[longestCommonSubsequence.ts:34](../../src/longestCommonSubsequence.ts#L34)
