<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / isInPolygon

# Function: isInPolygon()

> **isInPolygon**(`object`: [`Cartesian`](../type-aliases/Cartesian.md) \| [`Rect`](../type-aliases/Rect.md) \| [`Polygon`](../type-aliases/Polygon.md), `polygon`: [`Polygon`](../type-aliases/Polygon.md)): `boolean`

Defined in: [is-in-polygon.ts:26](https://github.com/technobuddha/library/blob/main/src/is-in-polygon.ts#L26)

Determines whether a given point or rectangle is inside or on the edge of a polygon.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object` | [`Cartesian`](../type-aliases/Cartesian.md) \| [`Rect`](../type-aliases/Rect.md) \| [`Polygon`](../type-aliases/Polygon.md) | The point or rectangle to test. |
| `polygon` | [`Polygon`](../type-aliases/Polygon.md) | The polygon to test against, represented as an array of Cartesian coordinates. |

## Returns

`boolean`

`true` if the object is inside the polygon or on its edge, otherwise `false`.

## Remarks

- The polygon is assumed to be a simple, non-self-intersecting polygon.
- Points on the edge of the polygon return `true`.
- For rectangles, all corners must be inside the polygon.
- Uses ray-casting algorithm with explicit edge detection.
