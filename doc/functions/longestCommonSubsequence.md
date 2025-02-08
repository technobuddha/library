[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / longestCommonSubsequence

# Function: longestCommonSubsequence()

> **longestCommonSubsequence**\<`T`\>(`array1`, `array2`, `__namedParameters`): `T`[]

Defined in: [longest-common-subsequence.ts:34](https://github.com/technobuddha/library/blob/main/src/longest-common-subsequence.ts#L34)

Implementation of Longest Common Subsequence problem.
http://en.wikipedia.org/wiki/Longest_common_subsequence

Returns the longest possible array that is subarray of both of given arrays.

## Type Parameters

• **T**

## Parameters

### array1

`ArrayLike`\<`T`\>

First array of objects.

### array2

`ArrayLike`\<`T`\>

Second array of objects.

### \_\_namedParameters

[`LongestCommonSubsequenceOptions`](../type-aliases/LongestCommonSubsequenceOptions.md)\<`T`\> = `{}`

see [LongestCommonSubsequenceOptions](../type-aliases/LongestCommonSubsequenceOptions.md)

## Returns

`T`[]

A list of objects that are common to both arrays
such that there is no common subsequence with size greater than the
length of the list.

## Default Value

```ts
compare equality comparison
```

## Default Value

```ts
collect basic collector
```
