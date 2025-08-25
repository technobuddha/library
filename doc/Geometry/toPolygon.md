<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / toPolygon

# Function: toPolygon()

## Call Signature

> **toPolygon**(`pointA`: [`Cartesian`](Cartesian.md), `pointB`: [`Cartesian`](Cartesian.md)): [`Polygon`](Polygon.md)

Defined in: [to-polygon.ts:17](https://github.com/technobuddha/library/blob/main/src/to-polygon.ts#L17)

Converts two Cartesian points or a rectangle into a `Polygon` object.

When provided with two Cartesian points, the function constructs a rectangle
defined by these points as opposite corners. When provided with a `Rect`
object, it constructs a polygon representing the rectangle's corners.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pointA` | [`Cartesian`](Cartesian.md) | The first corner point of the rectangle (if using points). |
| `pointB` | [`Cartesian`](Cartesian.md) | The opposite corner point of the rectangle (if using points). |

### Returns

[`Polygon`](Polygon.md)

A `Polygon` object representing the rectangle.

## Call Signature

> **toPolygon**(`rect`: [`Rect`](Rect.md)): [`Polygon`](Polygon.md)

Defined in: [to-polygon.ts:18](https://github.com/technobuddha/library/blob/main/src/to-polygon.ts#L18)

Converts two Cartesian points or a rectangle into a `Polygon` object.

When provided with two Cartesian points, the function constructs a rectangle
defined by these points as opposite corners. When provided with a `Rect`
object, it constructs a polygon representing the rectangle's corners.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `rect` | [`Rect`](Rect.md) |

### Returns

[`Polygon`](Polygon.md)

A `Polygon` object representing the rectangle.

