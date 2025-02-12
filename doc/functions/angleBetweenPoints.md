<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / angleBetweenPoints

# Function: angleBetweenPoints()

> **angleBetweenPoints**(`a`: [`Cartesian`](../type-aliases/Cartesian.md), `b`: [`Cartesian`](../type-aliases/Cartesian.md)): `number`

Defined in: [angle-between-points.ts:14](https://github.com/technobuddha/library/blob/main/src/angle-between-points.ts#L14)

Computes the angle between two points (x1,y1) and (x2,y2).
Angle zero points in the +X direction, PI/2 radians points in the +Y
direction (down) and from there we grow clockwise towards PI*2 radians.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | [`Cartesian`](../type-aliases/Cartesian.md) | first point. |
| `b` | [`Cartesian`](../type-aliases/Cartesian.md) | second. |

## Returns

`number`

Standardized angle in radians of the vector from *a* to *b*.
