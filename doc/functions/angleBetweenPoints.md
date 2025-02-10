<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / angleBetweenPoints

# Function: angleBetweenPoints()

> **angleBetweenPoints**(`a`, `b`): `number`

Defined in: [angle-between-points.ts:13](https://github.com/technobuddha/library/blob/main/src/angle-between-points.ts#L13)

Computes the angle between two points (x1,y1) and (x2,y2).
Angle zero points in the +X direction, PI/2 radians points in the +Y
direction (down) and from there we grow clockwise towards PI*2 radians.

## Parameters

### a

[`Cartesian`](../type-aliases/Cartesian.md)

first point.

### b

[`Cartesian`](../type-aliases/Cartesian.md)

second.

## Returns

`number`

Standardized angle in radians of the vector from *a* to *b*.
