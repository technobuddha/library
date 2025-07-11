<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / isOnLine

# Function: isOnLine()

> **isOnLine**(`point`: [`Cartesian`](../type-aliases/Cartesian.md), `line`: [`LineSegment`](../type-aliases/LineSegment.md), `epsilon`: `number`): `boolean`

Defined in: [is-on-line.ts:17](https://github.com/technobuddha/library/blob/main/src/is-on-line.ts#L17)

Determines whether a given point lies on a specified line segment within a certain tolerance.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `point` | [`Cartesian`](../type-aliases/Cartesian.md) | `undefined` | The Cartesian coordinates of the point to check. |
| `line` | [`LineSegment`](../type-aliases/LineSegment.md) | `undefined` | The line segment defined by its endpoints. |
| `epsilon` | `number` | `1e-10` | Optional tolerance for floating-point comparisons (default is 1e-10). |

## Returns

`boolean`

`true` if the point lies on the line segment within the given tolerance, otherwise `false`.
