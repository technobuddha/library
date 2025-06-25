<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / lineIntersection

# Function: lineIntersection()

> **lineIntersection**(`a`: [`LineSegment`](../type-aliases/LineSegment.md), `b`: [`LineSegment`](../type-aliases/LineSegment.md), `extend`: `boolean`): `undefined` \| `null` \| [`Cartesian`](../type-aliases/Cartesian.md)

Defined in: [line-intersection.ts:16](https://github.com/technobuddha/library/blob/main/src/line-intersection.ts#L16)

Calculates the intersection point of two line segments.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `a` | [`LineSegment`](../type-aliases/LineSegment.md) | `undefined` | The first line segment. |
| `b` | [`LineSegment`](../type-aliases/LineSegment.md) | `undefined` | The second line segment. |
| `extend` | `boolean` | `false` | If `true`, treats the segments as infinite lines; if `false`, only considers the actual segments. |

## Returns

`undefined` \| `null` \| [`Cartesian`](../type-aliases/Cartesian.md)

The intersection point as a `Point` object if the segments (or lines, if `extend` is `true`) intersect.
         Returns `undefined` if the lines are parallel or coincident.
         Returns `null` if the intersection is outside the segments and `extend` is `false`.
