<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / convexHull

# Function: convexHull()

> **convexHull**(`vertices`: [`Polygon`](Polygon.md)): `undefined` \| [`Polygon`](Polygon.md)

Defined in: [convex-hull.ts:18](https://github.com/technobuddha/library/blob/main/src/convex-hull.ts#L18)

Computes the convex hull of a set of 2D points using the Monotone Chain algorithm.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vertices` | [`Polygon`](Polygon.md) | An array of points representing the polygon vertices. Each point should have `x` and `y` properties. |

## Returns

`undefined` \| [`Polygon`](Polygon.md)

The convex hull as an array of points in counterclockwise order, or `undefined` if there are fewer than 3 vertices.

## See

[Monotone Chain](https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript|)

## Remarks

- The returned array does not repeat the starting point at the end.
- Points on the edge of the hull may be included or excluded depending on their order.
