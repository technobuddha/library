[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / angleDifference

# Module: angleDifference

## Table of contents

### References

- [default](angledifference.md#default)

### Functions

- [angleDifference](angledifference.md#angledifference)

## References

### default

Renames and exports: [angleDifference](angledifference.md#angledifference)

## Functions

### angleDifference

▸ **angleDifference**(`startAngle`: *number*, `endAngle`: *number*): *number*

Computes the difference between startAngle and endAngle (angles in radians).

**`remarks`**
Positive numbers mean that the
direction is clockwise. Negative numbers indicate a counter-clockwise direction.
The shortest route (clockwise vs counter-clockwise) between the angles is used.
When the difference is PI radians, the function returns PI (not -PI)

**`example`**
angleDifference(PI * 1/6,  PI * 2/6) is PI * 1/6

angleDifference(PI * 2/6, PI * 1/6)  is -PI * 1/6.

angleDifference(PI * 11/6, PI * 1/6) is PI * 2/6

angleDifference(PI * 1/6, PI * 11/6) is -PI * 1/6.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startAngle` | *number* | Start angle in radians. |
| `endAngle` | *number* | End angle in radians. |

**Returns:** *number*

The number of radians that when added to *startAngle* will result in *endAngle*.

Defined in: [src/angleDifference.ts:25](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/angleDifference.ts#L25)
