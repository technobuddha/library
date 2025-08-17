<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / isWithLine

# Function: isWithLine()

> **isWithLine**(`point`: [`Cartesian`](Cartesian.md), `line`: [`LineSegment`](LineSegment.md), `epsilon`: `number`): `boolean`

Defined in: [is-with-line.ts:16](https://github.com/technobuddha/library/blob/main/src/is-with-line.ts#L16)

Determines whether a given point lies on a specified line segment within a certain tolerance.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `point` | [`Cartesian`](Cartesian.md) | `undefined` | The Cartesian coordinates of the point to test. |
| `line` | [`LineSegment`](LineSegment.md) | `undefined` | The line segment, defined by its endpoints. |
| `epsilon` | `number` | `1e-10` | Optional tolerance for floating-point comparison (default is 1e-10). |

## Returns

`boolean`

`true` if the point lies on the line segment within the given tolerance, otherwise `false`.
