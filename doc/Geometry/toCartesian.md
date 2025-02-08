<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / toCartesian

# Function: toCartesian()

> **toCartesian**(`point`: [`Polar`](Polar.md), `unit`: [`AngleUnit`](AngleUnit.md)): [`Cartesian`](Cartesian.md)

Defined in: [to-cartesian.ts:12](https://github.com/technobuddha/library/blob/main/src/to-cartesian.ts#L12)

Convert polar coordinates to cartesian

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `point` | [`Polar`](Polar.md) | `undefined` | radius, angle in radians (zero points in +X direction). |
| `unit` | [`AngleUnit`](AngleUnit.md) | `'radians'` | - |

## Returns

[`Cartesian`](Cartesian.md)

Object containing the X and Y-distance for the angle and radius.
