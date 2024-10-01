[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [longest-common-subsequence](../README.md) / longestCommonSubsequence

# Function: longestCommonSubsequence()

> **longestCommonSubsequence**\<`T`\>(`array1`, `array2`, `__namedParameters`): `T`[]

Implementation of Longest Common Subsequence problem.
http://en.wikipedia.org/wiki/Longest_common_subsequence

Returns the longest possible array that is subarray of both of given arrays.

## Type Parameters

• **T**

## Parameters

• **array1**: `ArrayLike`\<`T`\>

First array of objects.

• **array2**: `ArrayLike`\<`T`\>

Second array of objects.

• **\_\_namedParameters**: [`Options`](../type-aliases/Options.md)\<`T`\> = `{}`

see [Options](../type-aliases/Options.md)

## Returns

`T`[]

A list of objects that are common to both arrays
such that there is no common subsequence with size greater than the
length of the list.

## Default

```ts
compare equality comparison
```

## Default

```ts
collect basic collector
```

## Defined in

longest-common-subsequence.ts:34
