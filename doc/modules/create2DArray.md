[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / create2DArray

# Module: create2DArray

## Table of contents

### References

- [default](create2DArray.md#default)

### Functions

- [create2DArray](create2DArray.md#create2darray)

## References

### default

Renames and exports: [create2DArray](create2DArray.md#create2darray)

## Functions

### create2DArray

▸ **create2DArray**<`T`\>(`width`, `height`, `fill`): `T`[][]

Create a two dimensional array with all elements initialized

**`remark`** Array is accessed by array[w][h]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | Width of the array |
| `height` | `number` | Height of the array |
| `fill` | `T` \| (`x`: `number`, `y`: `number`) => `T` | value to fill the array, or a function returning the fill value for each element |

#### Returns

`T`[][]

#### Defined in

[create2DArray.ts:12](../../src/create2DArray.ts#L12)
