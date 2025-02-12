<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / standardDeviation

# Function: standardDeviation()

> **standardDeviation**(...`datapoints`: `number`[]): `number`

Defined in: [standard-deviation.ts:14](https://github.com/technobuddha/library/blob/main/src/standard-deviation.ts#L14)

Returns the sample standard deviation of the arguments.  For a definition of
sample standard deviation, see http://en.wikipedia.org/wiki/Standard_deviation

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`datapoints` | `number`[] | samples to analyze. |

## Returns

`number`

The sample standard deviation of the arguments (0 if fewer
than two samples were provided, or NaN if any of the samples is
not a valid number).
