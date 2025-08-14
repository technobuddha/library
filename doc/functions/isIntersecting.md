<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / isIntersecting

# Function: isIntersecting()

> **isIntersecting**(`shape`: [`LineSegment`](../type-aliases/LineSegment.md) \| [`Polygon`](../type-aliases/Polygon.md), `polygon`: [`Polygon`](../type-aliases/Polygon.md)): `boolean`

Defined in: [is-intersecting.ts:25](https://github.com/technobuddha/library/blob/main/src/is-intersecting.ts#L25)

Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shape` | [`LineSegment`](../type-aliases/LineSegment.md) \| [`Polygon`](../type-aliases/Polygon.md) | The shape to test for intersection, which can be either a LineSegment or a Polygon. |
| `polygon` | [`Polygon`](../type-aliases/Polygon.md) | The polygon to test against. |

## Returns

`boolean`

`true` if the shape intersects with the polygon, otherwise `false`.

## Remarks

- If `shape` is a Polygon, the function checks if any of its edges intersect with the given polygon,
  or if two of its vertices lie on the polygon.
- If `shape` is a LineSegment, the function checks if it intersects with any edge of the polygon,
  or if both endpoints of a polygon edge lie on the line segment.
