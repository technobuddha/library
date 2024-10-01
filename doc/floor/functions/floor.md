[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [floor](../README.md) / floor

# Function: floor()

> **floor**(`input`, `precision`): `number`

A tweaked variant of {@code Math.floor} which tolerates if the passed number
is infinitesimally smaller than the closest integer. It often happens with
the results of floating point calculations because of the finite precision
of the intermediate results. For example {@code Math.floor(Math.log(1000) / Math.LN10) == 2}, not 3 as one would expect.

## Parameters

• **input**: `number`

A number.

• **precision**: `Options` = `{}`

The prevision to round down to.

## Returns

`number`

The largest integer less than or equal to {@code num}.

## Defined in

floor.ts:18
