[@technobuddha/library](../..) / [Modules](../Modules.md) / variance

# Module: variance

## Table of contents

### References

- [default](variance.md#default)

### Functions

- [variance](variance.md#variance)

## References

### default

Renames and exports: [variance](variance.md#variance)

## Functions

### variance

▸ **variance**(...`datapoints`: *number*[]): *number*

Returns the unbiased sample variance of the arguments. For a definition,
see http://en.wikipedia.org/wiki/Variance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...datapoints` | *number*[] | Number samples to analyze. |

**Returns:** *number*

The unbiased sample variance of the arguments (0 if fewer
than two samples were provided, or {@code NaN} if any of the samples is
not a valid number).

Defined in: [src/variance.ts:13](../../src/variance.ts#L13)
