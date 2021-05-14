[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / create2DArray

# Module: create2DArray

## Table of contents

### References

- [default](create2darray.md#default)

### Functions

- [create2DArray](create2darray.md#create2darray)

## References

### default

Renames and exports: [create2DArray](create2darray.md#create2darray)

## Functions

### create2DArray

▸ **create2DArray**<T\>(`width`: *number*, `height`: *number*, `fill`: T \| (`x`: *number*, `y`: *number*) => T): T[][]

Create a two dimensional array with all elements initialized

**`remark`** Array is accessed by array[w][h]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | *number* | Width of the array |
| `height` | *number* | Height of the array |
| `fill` | T \| (`x`: *number*, `y`: *number*) => T | value to fill the array, or a function returning the fill value for each element |

**Returns:** T[][]

Defined in: [src/create2DArray.ts:12](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/create2DArray.ts#L12)
