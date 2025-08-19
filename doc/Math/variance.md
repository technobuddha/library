<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / variance

# Function: variance()

> **variance**(...`dataPoints`: `number`[]): `number`

Defined in: [variance.ts:14](https://github.com/technobuddha/library/blob/main/src/variance.ts#L14)

Returns the unbiased sample [Variance](https://en.wikipedia.org/wiki/Variance) of the arguments.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`dataPoints` | `number`[] | Number samples to analyze. |

## Returns

`number`

The unbiased sample variance of the arguments (0 if fewer
than two samples were provided, or

## See

NaN if any of the samples is
not a valid number).
