<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / MetricUnitsOptions

# Type Alias: MetricUnitsOptions

> **MetricUnitsOptions**: \{ `format`: `string`; `macro`: `ArrayLike`\<`string`\>; `micro`: `ArrayLike`\<`string`\>; `pad`: `number`; `precision`: `number`; `unit`: `number`; \}

Defined in: [metric-units.ts:10](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L10)

## Type declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="format"></a> `format`? | `string` | format specification to pass to [formatNumber](../functions/formatNumber.md) | [metric-units.ts:14](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L14) |
| <a id="macro"></a> `macro`? | `ArrayLike`\<`string`\> | Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y']) | [metric-units.ts:22](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L22) |
| <a id="micro"></a> `micro`? | `ArrayLike`\<`string`\> | Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y']) | [metric-units.ts:26](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L26) |
| <a id="pad"></a> `pad`? | `number` | left padding to apply to numeric value | [metric-units.ts:18](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L18) |
| <a id="precision"></a> `precision`? | `number` | Number of digits after the decimal point to display | [metric-units.ts:34](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L34) |
| <a id="unit"></a> `unit`? | `number` | Multiplier for each level of suffixes (default: 1000) | [metric-units.ts:30](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L30) |
