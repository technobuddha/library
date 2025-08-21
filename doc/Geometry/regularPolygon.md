<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / regularPolygon

# Function: regularPolygon()

> **regularPolygon**(`sides`: `number`, `radius`: `number`, `origin`: [`Cartesian`](Cartesian.md)): [`Polygon`](Polygon.md)

Defined in: [regular-polygon.ts:15](https://github.com/technobuddha/library/blob/main/src/regular-polygon.ts#L15)

Generates the vertices of a regular polygon as an array of Cartesian points.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `sides` | `number` | `3` | The number of sides of the polygon (must be at least 3). Defaults to 3. |
| `radius` | `number` | `1` | The radius of the polygon (distance from the origin to each vertex). Defaults to 1. |
| `origin` | [`Cartesian`](Cartesian.md) | `Origin` | The center point of the polygon as a Cartesian coordinate. Defaults to {x: 0, y: 0}. |

## Returns

[`Polygon`](Polygon.md)

An array of Cartesian points representing the vertices of the regular polygon.

## Throws

`TypeError` If the number of sides is less than 3.
