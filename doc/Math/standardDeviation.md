<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / standardDeviation

# Function: standardDeviation()

> **standardDeviation**(...`dataPoints`: `number`[]): `number`

Defined in: [standard-deviation.ts:13](https://github.com/technobuddha/library/blob/main/src/standard-deviation.ts#L13)

Returns the sample [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the arguments.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`dataPoints` | `number`[] | samples to analyze. |

## Returns

`number`

The sample standard deviation of the arguments (0 if fewer
than two samples were provided, or NaN if any of the samples is
not a valid number).
