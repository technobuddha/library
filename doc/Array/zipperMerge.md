<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / zipperMerge

# Function: zipperMerge()

Merges multiple arrays into a single array by interleaving their elements at each index.
Each element of the resulting array is an array containing the elements from the input arrays at the corresponding index.
If input arrays have different lengths, `undefined` will be used for missing elements.

## Param

The arrays to merge together.

## Example

```typescript
zipperMerge([1, 2, 3], ['a', 'b', 'c']);
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

zipperMerge([1, 2], ['a', 'b', 'c']);
// Returns: [[1, 'a'], [2, 'b'], [undefined, 'c']]
```

## Call Signature

> **zipperMerge**\<`T1`, `T2`\>(`a1`: `T1`[], `a2`: `T2`[]): \[`undefined` \| `T1`, `undefined` \| `T2`\][]

Defined in: [zipper-merge.ts:1](https://github.com/technobuddha/library/blob/main/src/zipper-merge.ts#L1)

### Type Parameters

| Type Parameter |
| ------ |
| `T1` |
| `T2` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a1` | `T1`[] |
| `a2` | `T2`[] |

### Returns

\[`undefined` \| `T1`, `undefined` \| `T2`\][]

## Call Signature

> **zipperMerge**\<`T1`, `T2`, `T3`\>(`a1`: `T1`[], `a2`: `T2`[], `a3`: `T3`[]): \[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`\][]

Defined in: [zipper-merge.ts:2](https://github.com/technobuddha/library/blob/main/src/zipper-merge.ts#L2)

### Type Parameters

| Type Parameter |
| ------ |
| `T1` |
| `T2` |
| `T3` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a1` | `T1`[] |
| `a2` | `T2`[] |
| `a3` | `T3`[] |

### Returns

\[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`\][]

## Call Signature

> **zipperMerge**\<`T1`, `T2`, `T3`, `T4`\>(`a1`: `T1`[], `a2`: `T2`[], `a3`: `T3`[], `a4`: `T4`[]): \[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`\][]

Defined in: [zipper-merge.ts:7](https://github.com/technobuddha/library/blob/main/src/zipper-merge.ts#L7)

### Type Parameters

| Type Parameter |
| ------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a1` | `T1`[] |
| `a2` | `T2`[] |
| `a3` | `T3`[] |
| `a4` | `T4`[] |

### Returns

\[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`\][]

## Call Signature

> **zipperMerge**\<`T1`, `T2`, `T3`, `T4`, `T5`\>(`a1`: `T1`[], `a2`: `T2`[], `a3`: `T3`[], `a4`: `T4`[], `a5`: `T5`[]): \[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`, `undefined` \| `T5`\][]

Defined in: [zipper-merge.ts:13](https://github.com/technobuddha/library/blob/main/src/zipper-merge.ts#L13)

### Type Parameters

| Type Parameter |
| ------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a1` | `T1`[] |
| `a2` | `T2`[] |
| `a3` | `T3`[] |
| `a4` | `T4`[] |
| `a5` | `T5`[] |

### Returns

\[`undefined` \| `T1`, `undefined` \| `T2`, `undefined` \| `T3`, `undefined` \| `T4`, `undefined` \| `T5`\][]

## Call Signature

> **zipperMerge**\<`T`\>(...`a`: `T`[][]): (`undefined` \| `T`)[][]

Defined in: [zipper-merge.ts:20](https://github.com/technobuddha/library/blob/main/src/zipper-merge.ts#L20)

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `T`[][] |

### Returns

(`undefined` \| `T`)[][]
