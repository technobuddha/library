<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / midpoint

# Function: midpoint()

> **midpoint**(`line`: [`LineSegment`](LineSegment.md), `part`: `number`): [`Cartesian`](Cartesian.md)

Defined in: [midpoint.ts:14](https://github.com/technobuddha/library/blob/main/src/midpoint.ts#L14)

Calculates a point at a given fraction (`part`) along a line segment.  By default it returns the
true midpoint of the line segment

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `line` | [`LineSegment`](LineSegment.md) | `undefined` | The line segment defined by its start (`x0`, `y0`) and end (`x1`, `y1`) coordinates. |
| `part` | `number` | `0.5` | The fraction along the line segment at which to calculate the point (default is `0.5` for the midpoint). |

## Returns

[`Cartesian`](Cartesian.md)

The Cartesian coordinates of the calculated point.
