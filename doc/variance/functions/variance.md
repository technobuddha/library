[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [variance](../README.md) / variance

# Function: variance()

> **variance**(...`datapoints`): `number`

Returns the unbiased sample variance of the arguments. For a definition,
see http://en.wikipedia.org/wiki/Variance

## Parameters

• ...**datapoints**: `number`[]

Number samples to analyze.

## Returns

`number`

The unbiased sample variance of the arguments (0 if fewer
than two samples were provided, or {@code NaN} if any of the samples is
not a valid number).

## Defined in

[variance.ts:12](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/variance.ts#L12)
