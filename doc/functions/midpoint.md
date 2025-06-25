<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / midpoint

# Function: midpoint()

> **midpoint**(`line`: [`LineSegment`](../type-aliases/LineSegment.md), `part`: `number`): [`Cartesian`](../type-aliases/Cartesian.md)

Defined in: [midpoint.ts:14](https://github.com/technobuddha/library/blob/main/src/midpoint.ts#L14)

Calculates a point at a given fraction (`part`) along a line segment.  By default it returns the
true midpoint of the line segment

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `line` | [`LineSegment`](../type-aliases/LineSegment.md) | `undefined` | The line segment defined by its start (`x0`, `y0`) and end (`x1`, `y1`) coordinates. |
| `part` | `number` | `0.5` | The fraction along the line segment at which to calculate the point (default is `0.5` for the midpoint). |

## Returns

[`Cartesian`](../type-aliases/Cartesian.md)

The Cartesian coordinates of the calculated point.
