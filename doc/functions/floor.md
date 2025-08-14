<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / floor

# Function: floor()

> **floor**(`input`: `number`, `precision`: [`FloorOptions`](../type-aliases/FloorOptions.md)): `number`

Defined in: [floor.ts:27](https://github.com/technobuddha/library/blob/main/src/floor.ts#L27)

A tweaked variant of [Math.floor](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) which tolerates if the passed number
is infinitesimally smaller than the closest integer. It often happens with
the results of floating point calculations because of the finite precision
of the intermediate results. For example Math.floor(Math.log(1000) /
Math.LN10) == 2, not 3 as one would expect.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | A number. |
| `precision` | [`FloorOptions`](../type-aliases/FloorOptions.md) | The prevision to round down to. |

## Returns

`number`

The largest integer less than or equal to

## See

num.
