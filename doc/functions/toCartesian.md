<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / toCartesian

# Function: toCartesian()

> **toCartesian**(`__namedParameters`: [`Polar`](../type-aliases/Polar.md), `unit`: [`AngleUnit`](../type-aliases/AngleUnit.md)): [`Cartesian`](../type-aliases/Cartesian.md)

Defined in: [to-cartesian.ts:12](https://github.com/technobuddha/library/blob/main/src/to-cartesian.ts#L12)

Convert polar coordinates to cartesian

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `__namedParameters` | [`Polar`](../type-aliases/Polar.md) | `undefined` | radius, angle in radians (zero points in +X direction). |
| `unit` | [`AngleUnit`](../type-aliases/AngleUnit.md) | `'radians'` | - |

## Returns

[`Cartesian`](../type-aliases/Cartesian.md)

Object containing the X and Y-distance for the angle and radius.
