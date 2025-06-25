<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / isPointInPolygon

# Function: isPointInPolygon()

> **isPointInPolygon**(`point`: [`Cartesian`](../type-aliases/Cartesian.md), `polygon`: [`Polygon`](../type-aliases/Polygon.md)): `boolean`

Defined in: [is-point-in-polygon.ts:21](https://github.com/technobuddha/library/blob/main/src/is-point-in-polygon.ts#L21)

Determines whether a given point is inside or on the edge of a polygon.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Cartesian`](../type-aliases/Cartesian.md) | The point to test, represented as a Cartesian coordinate. |
| `polygon` | [`Polygon`](../type-aliases/Polygon.md) | The polygon to test against, represented as an array of Cartesian coordinates. |

## Returns

`boolean`

`true` if the point is inside the polygon or on its edge, otherwise `false`.

## Remarks

- The polygon is assumed to be a simple, non-self-intersecting polygon.
- Points on the edge of the polygon return `true`.
- Uses ray-casting algorithm with explicit edge detection.
