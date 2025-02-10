<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / longestCommonSubstring

# Function: longestCommonSubstring()

> **longestCommonSubstring**(`string1`, `string2`, `__namedParameters`): `string`

Defined in: [longest-common-substring.ts:19](https://github.com/technobuddha/library/blob/main/src/longest-common-substring.ts#L19)

Implementation of Longest Common Substring problem.
https://en.wikipedia.org/wiki/Longest_common_substring_problem

Returns the longest possible substring that is substring of both of given strings.

## Parameters

### string1

`string`

First string.

### string2

`string`

Second string.

### \_\_namedParameters

[`LongestCommonSubstringOptions`](../type-aliases/LongestCommonSubstringOptions.md) = `{}`

## Returns

`string`

A string that is common to both strings such that there is no
common substring with size greater than the length of the string.
