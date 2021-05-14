[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / angleBetweenPoints

# Module: angleBetweenPoints

## Table of contents

### References

- [default](anglebetweenpoints.md#default)

### Functions

- [angleBetweenPoints](anglebetweenpoints.md#anglebetweenpoints)

## References

### default

Renames and exports: [angleBetweenPoints](anglebetweenpoints.md#anglebetweenpoints)

## Functions

### angleBetweenPoints

▸ **angleBetweenPoints**(`a`: [*Cartesian*](coordinates.md#cartesian), `b`: [*Cartesian*](coordinates.md#cartesian)): *number*

Computes the angle between two points (x1,y1) and (x2,y2).
Angle zero points in the +X direction, PI/2 radians points in the +Y
direction (down) and from there we grow clockwise towards PI*2 radians.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [*Cartesian*](coordinates.md#cartesian) | first point. |
| `b` | [*Cartesian*](coordinates.md#cartesian) | second. |

**Returns:** *number*

Standardized angle in radians of the vector from *a* to *b*.

Defined in: [src/angleBetweenPoints.ts:13](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/angleBetweenPoints.ts#L13)
