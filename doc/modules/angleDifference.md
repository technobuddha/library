[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / angleDifference

# Module: angleDifference

## Table of contents

### References

- [default](angleDifference.md#default)

### Functions

- [angleDifference](angleDifference.md#angledifference)

## References

### default

Renames and exports: [angleDifference](angleDifference.md#angledifference)

## Functions

### angleDifference

▸ **angleDifference**(`startAngle`, `endAngle`): `number`

Computes the difference between startAngle and endAngle (angles in radians).

**`remarks`**
Positive numbers mean that the
direction is clockwise. Negative numbers indicate a counter-clockwise direction.
The shortest route (clockwise vs counter-clockwise) between the angles is used.
When the difference is PI radians, the function returns PI (not -PI)

**`example`**
angleDifference(PI _ 1/6, PI _ 2/6) is PI \* 1/6

angleDifference(PI _ 2/6, PI _ 1/6) is -PI \* 1/6.

angleDifference(PI _ 11/6, PI _ 1/6) is PI \* 2/6

angleDifference(PI _ 1/6, PI _ 11/6) is -PI \* 1/6.

#### Parameters

| Name         | Type     | Description             |
| :----------- | :------- | :---------------------- |
| `startAngle` | `number` | Start angle in radians. |
| `endAngle`   | `number` | End angle in radians.   |

#### Returns

`number`

The number of radians that when added to _startAngle_ will result in _endAngle_.

#### Defined in

[angleDifference.ts:25](../../src/angleDifference.ts#L25)
