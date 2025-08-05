<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / MetricUnitsOptions

# Type Alias: MetricUnitsOptions

> **MetricUnitsOptions** = \{ `format?`: `string`; `macro?`: `ArrayLike`\<`string`\>; `micro?`: `ArrayLike`\<`string`\>; `pad?`: `number`; `precision?`: `number`; `unit?`: `number`; \}

Defined in: [metric-units.ts:51](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L51)

## Properties

### format?

> `optional` **format**: `string`

Defined in: [metric-units.ts:55](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L55)

format specification to pass to [formatNumber](../functions/formatNumber.md)

***

### macro?

> `optional` **macro**: `ArrayLike`\<`string`\>

Defined in: [metric-units.ts:63](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L63)

Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'])

***

### micro?

> `optional` **micro**: `ArrayLike`\<`string`\>

Defined in: [metric-units.ts:67](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L67)

Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'])

***

### pad?

> `optional` **pad**: `number`

Defined in: [metric-units.ts:59](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L59)

left padding to apply to numeric value

***

### precision?

> `optional` **precision**: `number`

Defined in: [metric-units.ts:75](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L75)

Number of digits after the decimal point to display

***

### unit?

> `optional` **unit**: `number`

Defined in: [metric-units.ts:71](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L71)

Multiplier for each level of suffixes (default: 1000)
