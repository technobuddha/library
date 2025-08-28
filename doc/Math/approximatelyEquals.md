<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / approximatelyEquals

# Function: approximatelyEquals()

```ts
function approximatelyEquals(
   a: number, 
   b: number, 
   __namedParameters: ApproximatelyEqualsOptions): boolean;
```

Defined in: [approximately-equals.ts:24](https://github.com/technobuddha/library/blob/main/src/approximately-equals.ts#L24)

Tests whether the two values are equal to each other, within a certain
tolerance, taking into account floating point errors (numbers within EPSILON).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number` | First number to compare. |
| `b` | `number` | Second number to compare. |
| `__namedParameters` | [`ApproximatelyEqualsOptions`](ApproximatelyEqualsOptions.md) | see [ApproximatelyEqualsOptions](ApproximatelyEqualsOptions.md) |

## Returns

`boolean`

true if *a* and *b* are nearly equal.

## Default Value

```ts
tolerance 0
```

