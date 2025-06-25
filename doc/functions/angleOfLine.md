<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / angleOfLine

# Function: angleOfLine()

> **angleOfLine**(`line`: [`LineSegment`](../type-aliases/LineSegment.md), `units`: [`AngleUnit`](../type-aliases/AngleUnit.md)): `number`

Defined in: [angle-of-line.ts:16](https://github.com/technobuddha/library/blob/main/src/angle-of-line.ts#L16)

Calculates the angle of a given line segment, relative to the horizontal azis

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `line` | [`LineSegment`](../type-aliases/LineSegment.md) | `undefined` | The line segment for which to calculate the angle. |
| `units` | [`AngleUnit`](../type-aliases/AngleUnit.md) | `'radians'` | The unit of the returned angle ('radians' by default). |

## Returns

`number`

The angle of the line segment in the specified units.
