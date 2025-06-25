<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / normalizeAngle

# Function: normalizeAngle()

> **normalizeAngle**(`angle`: `number`, `unit`: [`AngleUnit`](../type-aliases/AngleUnit.md)): `number`

Defined in: [normalize-angle.ts:13](https://github.com/technobuddha/library/blob/main/src/normalize-angle.ts#L13)

Normalizes an angle to be in range [0-π*2]. Angles outside this range will
be normalized to be the equivalent angle with that range.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `angle` | `number` | `undefined` | Angle in radians. |
| `unit` | [`AngleUnit`](../type-aliases/AngleUnit.md) | `'radians'` | - |

## Returns

`number`

Standardized angle.
