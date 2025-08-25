<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / isLeftOfLine

# Function: isLeftOfLine()

```ts
function isLeftOfLine(point: Cartesian, line: LineSegment): boolean;
```

Defined in: [is-left-of-line.ts:16](https://github.com/technobuddha/library/blob/main/src/is-left-of-line.ts#L16)

Determines whether a given point lies to the left of a specified line segment.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Cartesian`](Cartesian.md) | The Cartesian point to test. |
| `line` | [`LineSegment`](LineSegment.md) | The line segment to compare against. |

## Returns

`boolean`

`true` if the point is to the left of the line segment; otherwise, `false`.

