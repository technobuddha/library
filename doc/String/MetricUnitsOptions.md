<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / MetricUnitsOptions

# Type Alias: MetricUnitsOptions

> **MetricUnitsOptions** = \{ `format?`: `string`; `macro?`: `ArrayLike`\<`string`\>; `micro?`: `ArrayLike`\<`string`\>; `pad?`: `number`; `precision?`: `number`; `unit?`: `number`; \}

Defined in: [metric-units.ts:51](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L51)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="format"></a> `format?` | `string` | format specification to pass to [formatNumber](../Math/formatNumber.md) | [metric-units.ts:55](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L55) |
| <a id="macro"></a> `macro?` | `ArrayLike`\<`string`\> | Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y']) | [metric-units.ts:63](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L63) |
| <a id="micro"></a> `micro?` | `ArrayLike`\<`string`\> | Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y']) | [metric-units.ts:67](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L67) |
| <a id="pad"></a> `pad?` | `number` | left padding to apply to numeric value | [metric-units.ts:59](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L59) |
| <a id="precision"></a> `precision?` | `number` | Number of digits after the decimal point to display | [metric-units.ts:75](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L75) |
| <a id="unit"></a> `unit?` | `number` | Multiplier for each level of suffixes (default: 1000) | [metric-units.ts:71](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L71) |
