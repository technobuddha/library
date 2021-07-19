[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / angleBetweenPoints

# Module: angleBetweenPoints

## Table of contents

### References

- [default](angleBetweenPoints.md#default)

### Functions

- [angleBetweenPoints](angleBetweenPoints.md#anglebetweenpoints)

## References

### default

Renames and exports: [angleBetweenPoints](angleBetweenPoints.md#anglebetweenpoints)

## Functions

### angleBetweenPoints

▸ **angleBetweenPoints**(`a`, `b`): `number`

Computes the angle between two points (x1,y1) and (x2,y2).
Angle zero points in the +X direction, PI/2 radians points in the +Y
direction (down) and from there we grow clockwise towards PI*2 radians.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Cartesian`](coordinates.md#cartesian) | first point. |
| `b` | [`Cartesian`](coordinates.md#cartesian) | second. |

#### Returns

`number`

Standardized angle in radians of the vector from *a* to *b*.

#### Defined in

[angleBetweenPoints.ts:13](../../src/angleBetweenPoints.ts#L13)
