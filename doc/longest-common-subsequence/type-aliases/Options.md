[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [longest-common-subsequence](../README.md) / Options

# Type Alias: Options\<T\>

> **Options**\<`T`\>: `object`

## Type Parameters

• **T**

## Type declaration

### collect()?

Function used to decide what to return
as a result subsequence. It accepts 2 arguments: index of common element
in the first array and index in the second. The default function returns
element from the first array.

#### Parameters

• **this**: `void`

• **i1**: `number`

• **i2**: `number`

#### Returns

`T`

### compare()?

Function that acts as a custom comparator
for the array objects. Function should return true if objects are equal, otherwise false.

#### Parameters

• **this**: `void`

• **a**: `T`

• **b**: `T`

#### Returns

`boolean`

## Defined in

[longest-common-subsequence.ts:3](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/longest-common-subsequence.ts#L3)
