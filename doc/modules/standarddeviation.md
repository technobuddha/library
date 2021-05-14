[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / standardDeviation

# Module: standardDeviation

## Table of contents

### References

- [default](standarddeviation.md#default)

### Functions

- [standardDeviation](standarddeviation.md#standarddeviation)

## References

### default

Renames and exports: [standardDeviation](standarddeviation.md#standarddeviation)

## Functions

### standardDeviation

▸ **standardDeviation**(...`datapoints`: *number*[]): *number*

Returns the sample standard deviation of the arguments.  For a definition of
sample standard deviation, see http://en.wikipedia.org/wiki/Standard_deviation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...datapoints` | *number*[] | samples to analyze. |

**Returns:** *number*

The sample standard deviation of the arguments (0 if fewer
than two samples were provided, or NaN if any of the samples is
not a valid number).

Defined in: [standardDeviation.ts:12](../../src/standardDeviation.ts#L12)
