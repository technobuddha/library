<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / angleBetweenPoints

# Function: angleBetweenPoints()

> **angleBetweenPoints**(`a`: [`Cartesian`](../type-aliases/Cartesian.md), `b`: [`Cartesian`](../type-aliases/Cartesian.md), `unit`: [`AngleUnit`](../type-aliases/AngleUnit.md)): `number`

Defined in: [angle-between-points.ts:18](https://github.com/technobuddha/library/blob/main/src/angle-between-points.ts#L18)

Computes the angle between two points (x1,y1) and (x2,y2).
Angle zero points in the +X direction, π/2 radians points in the +Y
direction (down) and from there we grow clockwise towards π*2 radians.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `a` | [`Cartesian`](../type-aliases/Cartesian.md) | `undefined` | first point. |
| `b` | [`Cartesian`](../type-aliases/Cartesian.md) | `undefined` | second. |
| `unit` | [`AngleUnit`](../type-aliases/AngleUnit.md) | `'radians'` | The angle unit to use for the output. |

## Returns

`number`

Standardized angle of the vector from *a* to *b*.
