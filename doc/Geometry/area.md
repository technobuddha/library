<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / area

# Function: area()

> **area**(`vertices`: [`Polygon`](Polygon.md), `signed`: `boolean`): `number`

Defined in: [area.ts:17](https://github.com/technobuddha/library/blob/main/src/area.ts#L17)

Calculates the area of a polygon given its vertices.

The area is computed using the shoelace formula (also known as Gauss's area formula),
which sums the cross products of the edges. The function can return either the signed
area (which indicates the orientation of the vertices) or the absolute area.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `vertices` | [`Polygon`](Polygon.md) | `undefined` | An array of points representing the polygon's vertices, where each point has `x` and `y` properties. |
| `signed` | `boolean` | `false` | If `true`, returns the signed area (positive for counter-clockwise, negative for clockwise). Defaults to `false`. |

## Returns

`number`

The area of the polygon.
