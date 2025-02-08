[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / almostEquals

# Function: almostEquals()

> **almostEquals**(`a`, `b`, `__namedParameters`): `boolean`

Defined in: [almost-equals.ts:16](https://github.com/technobuddha/library/blob/main/src/almost-equals.ts#L16)

Tests whether the two values are equal to each other, within a certain
tolerance, taking into account floating point errors (numbers within EPSILON).

## Parameters

### a

`number`

First number to compare.

### b

`number`

Second number to compare.

### \_\_namedParameters

[`AlmostEqualsOptions`](../type-aliases/AlmostEqualsOptions.md) = `{}`

see [AlmostEqualsOptions](../type-aliases/AlmostEqualsOptions.md)

## Returns

`boolean`

true if *a* and *b* are nearly equal.

## Default Value

```ts
tolerance 0
```
