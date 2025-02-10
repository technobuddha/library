<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / create2DArray

# Function: create2DArray()

> **create2DArray**\<`T`\>(`width`, `height`, `fill`): `T`[][]

Defined in: [create-2d-array.ts:12](https://github.com/technobuddha/library/blob/main/src/create-2d-array.ts#L12)

Create a two dimensional array with all elements initialized

## Type Parameters

• **T**

## Parameters

### width

`number`

Width of the array

### height

`number`

Height of the array

### fill

value to fill the array, or a function returning the fill value for each element

`T` | (`x`, `y`) => `T`

## Returns

`T`[][]

## Remarks

Array is accessed by array[w][h]
