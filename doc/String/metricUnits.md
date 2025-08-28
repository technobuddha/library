<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / metricUnits

# Function: metricUnits()

```ts
function metricUnits(input: number, options: MetricUnitsOptions): string;
```

Defined in: [metric-units.ts:87](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L87)

Abbreviate a number by adding a suffix for metric units (i.e. 1000 =\> 1K, .0001 = 1m)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | The number to abbreviate |
| `options` | [`MetricUnitsOptions`](MetricUnitsOptions.md) | [MetricUnitsOptions](MetricUnitsOptions.md) |

## Returns

`string`

