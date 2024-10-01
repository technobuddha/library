[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [angle-between-points](../README.md) / angleBetweenPoints

# Function: angleBetweenPoints()

> **angleBetweenPoints**(`a`, `b`): `number`

Computes the angle between two points (x1,y1) and (x2,y2).
Angle zero points in the +X direction, PI/2 radians points in the +Y
direction (down) and from there we grow clockwise towards PI*2 radians.

## Parameters

• **a**: [`Cartesian`](../../coordinates/type-aliases/Cartesian.md)

first point.

• **b**: [`Cartesian`](../../coordinates/type-aliases/Cartesian.md)

second.

## Returns

`number`

Standardized angle in radians of the vector from *a* to *b*.

## Defined in

[angle-between-points.ts:13](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/angle-between-points.ts#L13)
