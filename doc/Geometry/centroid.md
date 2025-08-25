<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / centroid

# Function: centroid()

```ts
function centroid(vertices: Polygon): Cartesian;
```

Defined in: [centroid.ts:19](https://github.com/technobuddha/library/blob/main/src/centroid.ts#L19)

Calculates the centroid (geometric center) of a polygon given its vertices.

The centroid is computed using the formula for the centroid of a non-self-intersecting closed polygon.
The vertices should be provided in order (either clockwise or counterclockwise).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vertices` | [`Polygon`](Polygon.md) | An array of points representing the vertices of the polygon. |

## Returns

[`Cartesian`](Cartesian.md)

The centroid as a Cartesian coordinate.

## Remarks

- The function assumes the polygon is non-self-intersecting.

