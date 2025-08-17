<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / angleBetweenPoints

# Function: angleBetweenPoints()

> **angleBetweenPoints**(`a`: [`Cartesian`](Cartesian.md), `b`: [`Cartesian`](Cartesian.md), `unit`: [`AngleUnit`](AngleUnit.md)): `number`

Defined in: [angle-between-points.ts:18](https://github.com/technobuddha/library/blob/main/src/angle-between-points.ts#L18)

Computes the angle between two points (x1,y1) and (x2,y2).
Angle zero points in the +X direction, π/2 radians points in the +Y
direction (down) and from there we grow clockwise towards π*2 radians.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `a` | [`Cartesian`](Cartesian.md) | `undefined` | first point. |
| `b` | [`Cartesian`](Cartesian.md) | `undefined` | second. |
| `unit` | [`AngleUnit`](AngleUnit.md) | `'radians'` | The angle unit to use for the output. |

## Returns

`number`

Standardized angle of the vector from *a* to *b*.
