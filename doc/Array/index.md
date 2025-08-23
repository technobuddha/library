<!-- markdownlint-disable -->

# @technobuddha/library

## Array

### Collapse

| Function | Description |
| ------ | ------ |
| [collapse](collapse.md) | Collapses a list of arguments into a flat array of strings. |

### Creation

| Function | Description |
| ------ | ------ |
| [create2DArray](create2DArray.md) | Create a two dimensional array with all elements initialized |

### Iteration

| Name | Description |
| ------ | ------ |
| [LookAheadOptions](LookAheadOptions.md) | Options for [lookAhead](lookAhead.md) operations. |
| [lookAhead](lookAhead.md) | Generates pairs of consecutive elements from the input array, with optional handling for the last element. |

### Matching

| Name | Description |
| ------ | ------ |
| [LongestCommonSubsequenceOptions](LongestCommonSubsequenceOptions.md) | Options for configuring the [longestCommonSubsequence](longestCommonSubsequence.md) calculation. |
| [longestCommonSubsequence](longestCommonSubsequence.md) | Determine the longest possible array that is subsequence of both of given arrays. |

### Merging

| Function | Description |
| ------ | ------ |
| [zipperMerge](zipperMerge.md) | Merges multiple arrays into a single array by interleaving their elements at each index. Each element of the resulting array is an array containing the elements from the input arrays at the corresponding index. If input arrays have different lengths, `undefined` will be used for missing elements. |

### Type Check

| Function | Description |
| ------ | ------ |
| [isArrayLike](isArrayLike.md) | Determines whether the provided value is array-like. |
