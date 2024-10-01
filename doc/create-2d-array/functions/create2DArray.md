[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [create-2d-array](../README.md) / create2DArray

# Function: create2DArray()

> **create2DArray**\<`T`\>(`width`, `height`, `fill`): `T`[][]

Create a two dimensional array with all elements initialized

## Type Parameters

• **T**

## Parameters

• **width**: `number`

Width of the array

• **height**: `number`

Height of the array

• **fill**: `T` \| (`x`, `y`) => `T`

value to fill the array, or a function returning the fill value for each element

## Returns

`T`[][]

## Remark

Array is accessed by array[w][h]

## Defined in

[create-2d-array.ts:12](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/create-2d-array.ts#L12)
