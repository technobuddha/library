<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / MetricUnitsOptions

# Type Alias: MetricUnitsOptions

> **MetricUnitsOptions** = \{ `format?`: `string`; `macro?`: `ArrayLike`\<`string`\>; `micro?`: `ArrayLike`\<`string`\>; `pad?`: `number`; `precision?`: `number`; `unit?`: `number`; \}

Defined in: [metric-units.ts:10](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L10)

## Properties

### format?

> `optional` **format**: `string`

Defined in: [metric-units.ts:14](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L14)

format specification to pass to [formatNumber](../functions/formatNumber.md)

***

### macro?

> `optional` **macro**: `ArrayLike`\<`string`\>

Defined in: [metric-units.ts:22](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L22)

Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'])

***

### micro?

> `optional` **micro**: `ArrayLike`\<`string`\>

Defined in: [metric-units.ts:26](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L26)

Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'])

***

### pad?

> `optional` **pad**: `number`

Defined in: [metric-units.ts:18](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L18)

left padding to apply to numeric value

***

### precision?

> `optional` **precision**: `number`

Defined in: [metric-units.ts:34](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L34)

Number of digits after the decimal point to display

***

### unit?

> `optional` **unit**: `number`

Defined in: [metric-units.ts:30](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L30)

Multiplier for each level of suffixes (default: 1000)
