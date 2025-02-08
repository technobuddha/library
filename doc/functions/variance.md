[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / variance

# Function: variance()

> **variance**(...`datapoints`): `number`

Defined in: [variance.ts:12](https://github.com/technobuddha/library/blob/main/src/variance.ts#L12)

Returns the unbiased sample variance of the arguments. For a definition,
see http://en.wikipedia.org/wiki/Variance

## Parameters

### datapoints

...`number`[]

Number samples to analyze.

## Returns

`number`

The unbiased sample variance of the arguments (0 if fewer
than two samples were provided, or

## See

NaN if any of the samples is
not a valid number).
