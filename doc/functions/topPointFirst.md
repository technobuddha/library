<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / topPointFirst

# Function: topPointFirst()

> **topPointFirst**(`line`: [`LineSegment`](../type-aliases/LineSegment.md)): [`LineSegment`](../type-aliases/LineSegment.md)

Defined in: [top-point-first.ts:14](https://github.com/technobuddha/library/blob/main/src/top-point-first.ts#L14)

Returns a `LineSegment` where the point with the higher y-coordinate is always the starting point (x0, y0).
If the original line's y1 is greater than y0, the line is returned as-is.
Otherwise, the start and end points are swapped.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `line` | [`LineSegment`](../type-aliases/LineSegment.md) | The line segment to process. |

## Returns

[`LineSegment`](../type-aliases/LineSegment.md)

A `LineSegment` with the topmost point as the starting point.
