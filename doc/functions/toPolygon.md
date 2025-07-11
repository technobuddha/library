<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / toPolygon

# Function: toPolygon()

## Call Signature

> **toPolygon**(`pointA`: [`Cartesian`](../type-aliases/Cartesian.md), `pointB`: [`Cartesian`](../type-aliases/Cartesian.md)): [`Polygon`](../type-aliases/Polygon.md)

Defined in: [to-polygon.ts:17](https://github.com/technobuddha/library/blob/main/src/to-polygon.ts#L17)

Converts two Cartesian points or a rectangle into a `Polygon` object.

When provided with two Cartesian points, the function constructs a rectangle
defined by these points as opposite corners. When provided with a `Rect`
object, it constructs a polygon representing the rectangle's corners.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pointA` | [`Cartesian`](../type-aliases/Cartesian.md) | The first corner point of the rectangle (if using points). |
| `pointB` | [`Cartesian`](../type-aliases/Cartesian.md) | The opposite corner point of the rectangle (if using points). |

### Returns

[`Polygon`](../type-aliases/Polygon.md)

A `Polygon` object representing the rectangle.

## Call Signature

> **toPolygon**(`rect`: [`Rect`](../type-aliases/Rect.md)): [`Polygon`](../type-aliases/Polygon.md)

Defined in: [to-polygon.ts:18](https://github.com/technobuddha/library/blob/main/src/to-polygon.ts#L18)

Converts two Cartesian points or a rectangle into a `Polygon` object.

When provided with two Cartesian points, the function constructs a rectangle
defined by these points as opposite corners. When provided with a `Rect`
object, it constructs a polygon representing the rectangle's corners.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `rect` | [`Rect`](../type-aliases/Rect.md) |

### Returns

[`Polygon`](../type-aliases/Polygon.md)

A `Polygon` object representing the rectangle.
