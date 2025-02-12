<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / LongestCommonSubsequenceOptions

# Type Alias: LongestCommonSubsequenceOptions\<T\>

> **LongestCommonSubsequenceOptions**\<`T`\>: \{ `collect`: `T`; `compare`: `boolean`; \}

Defined in: [longest-common-subsequence.ts:7](https://github.com/technobuddha/library/blob/main/src/longest-common-subsequence.ts#L7)

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Type declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="collect"></a> `collect()`? | `T` | Function used to decide what to return as a result subsequence. It accepts 2 arguments: index of common element in the first array and index in the second. The default function returns element from the first array. | [longest-common-subsequence.ts:19](https://github.com/technobuddha/library/blob/main/src/longest-common-subsequence.ts#L19) |
| <a id="compare"></a> `compare()`? | `boolean` | Function that acts as a custom comparator for the array objects. Function should return true if objects are equal, otherwise false. | [longest-common-subsequence.ts:12](https://github.com/technobuddha/library/blob/main/src/longest-common-subsequence.ts#L12) |
