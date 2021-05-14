[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / longestCommonSubsequence

# Module: longestCommonSubsequence

## Table of contents

### References

- [default](longestcommonsubsequence.md#default)

### Type aliases

- [Options](longestcommonsubsequence.md#options)

### Functions

- [longestCommonSubsequence](longestcommonsubsequence.md#longestcommonsubsequence)

## References

### default

Renames and exports: [longestCommonSubsequence](longestcommonsubsequence.md#longestcommonsubsequence)

## Type aliases

### Options

Ƭ **Options**<T\>: *object*

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `collect?` | (`i1`: *number*, `i2`: *number*) => T | Function used to decide what to return as a result subsequence. It accepts 2 arguments: index of common element in the first array and index in the second. The default function returns element from the first array. |
| `compare?` | (`a`: T, `b`: T) => *boolean* | Function that acts as a custom comparator for the array ojects. Function should return true if objects are equal, otherwise false. |

Defined in: [src/longestCommonSubsequence.ts:3](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/longestCommonSubsequence.ts#L3)

## Functions

### longestCommonSubsequence

▸ **longestCommonSubsequence**<T\>(`array1`: *ArrayLike*<T\>, `array2`: *ArrayLike*<T\>, `__namedParameters?`: [*Options*](longestcommonsubsequence.md#options)<T\>): T[]

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

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `array1` | *ArrayLike*<T\> | - | First array of objects. |
| `array2` | *ArrayLike*<T\> | - | Second array of objects. |
| `__namedParameters` | [*Options*](longestcommonsubsequence.md#options)<T\> | {} | see [Options](longestcommonsubsequence.md#options) |

**Returns:** T[]

A list of objects that are common to both arrays
such that there is no common subsequence with size greater than the
length of the list.

Defined in: [src/longestCommonSubsequence.ts:34](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/longestCommonSubsequence.ts#L34)
