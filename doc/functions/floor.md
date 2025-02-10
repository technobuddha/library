<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / floor

# Function: floor()

> **floor**(`input`, `precision`): `number`

Defined in: [floor.ts:18](https://github.com/technobuddha/library/blob/main/src/floor.ts#L18)

A tweaked variant of

## Parameters

### input

`number`

A number.

### precision

[`FloorOptions`](../type-aliases/FloorOptions.md) = `{}`

The prevision to round down to.

## Returns

`number`

The largest integer less than or equal to

## See

 - Math.floor which tolerates if the passed number
is infinitesimally smaller than the closest integer. It often happens with
the results of floating point calculations because of the finite precision
of the intermediate results. For example
 - Math.floor(Math.log(1000) /
Math.LN10) == 2, not 3 as one would expect.
 - num.
