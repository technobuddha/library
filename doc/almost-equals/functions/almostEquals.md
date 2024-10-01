[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [almost-equals](../README.md) / almostEquals

# Function: almostEquals()

> **almostEquals**(`a`, `b`, `__namedParameters`): `boolean`

Tests whether the two values are equal to each other, within a certain
tolerance, taking into account floating point errors (numbers within EPSILON).

## Parameters

• **a**: `number`

First number to compare.

• **b**: `number`

Second number to compare.

• **\_\_namedParameters**: [`Options`](../type-aliases/Options.md) = `{}`

see [Options](../type-aliases/Options.md)

## Returns

`boolean`

true if *a* and *b* are nearly equal.

## Default

```ts
tolerance 0
```

## Defined in

almost-equals.ts:16
