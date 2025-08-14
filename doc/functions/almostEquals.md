<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / almostEquals

# Function: almostEquals()

> **almostEquals**(`a`: `number`, `b`: `number`, `__namedParameters`: [`AlmostEqualsOptions`](../type-aliases/AlmostEqualsOptions.md)): `boolean`

Defined in: [almost-equals.ts:24](https://github.com/technobuddha/library/blob/main/src/almost-equals.ts#L24)

Tests whether the two values are equal to each other, within a certain
tolerance, taking into account floating point errors (numbers within EPSILON).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number` | First number to compare. |
| `b` | `number` | Second number to compare. |
| `__namedParameters` | [`AlmostEqualsOptions`](../type-aliases/AlmostEqualsOptions.md) | see [AlmostEqualsOptions](../type-aliases/AlmostEqualsOptions.md) |

## Returns

`boolean`

true if *a* and *b* are nearly equal.

## Default Value

```ts
tolerance 0
```
