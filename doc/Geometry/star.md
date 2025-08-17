<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / star

# Function: star()

> **star**(`sides`: `number`, `outer`: `number`, `inner`: `number`, `origin`: [`Cartesian`](Cartesian.md)): [`Polygon`](Polygon.md)

Defined in: [star.ts:16](https://github.com/technobuddha/library/blob/main/src/star.ts#L16)

Generates the vertices of a star-shaped polygon.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `sides` | `number` | `3` | The number of points (arms) of the star. Must be at least 3. |
| `outer` | `number` | `1` | The radius from the origin to the outer vertices (tips) of the star. |
| `inner` | `number` | `...` | The radius from the origin to the inner vertices (indentations) of the star. Defaults to half of `outer`. |
| `origin` | [`Cartesian`](Cartesian.md) | `...` | The center point of the star, as a Cartesian coordinate. Defaults to `{ x: 0, y: 0 }`. |

## Returns

[`Polygon`](Polygon.md)

An array of `Cartesian` points representing the vertices of the star in drawing order.

## Throws

`TypeError` If `sides` is less than 3.
