<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / isPolar

# Function: isPolar()

> **isPolar**(`point`: `unknown`): `point is Polar`

Defined in: [is-polar.ts:15](https://github.com/technobuddha/library/blob/main/src/is-polar.ts#L15)

Determines if the provided value is a Polar point.

A value is considered a Polar point if it is a non-null object
that contains numeric `angle` and `radius` properties.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | `unknown` | The value to test for Polar structure. |

## Returns

`point is Polar`

`true` if the value is a Polar point, otherwise `false`.
