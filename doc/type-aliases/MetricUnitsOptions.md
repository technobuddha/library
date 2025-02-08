[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / MetricUnitsOptions

# Type Alias: MetricUnitsOptions

> **MetricUnitsOptions**: `object`

Defined in: [metric-units.ts:6](https://github.com/technobuddha/library/blob/main/src/metric-units.ts#L6)

## Type declaration

### format?

> `optional` **format**: `string`

format specification to pass to [formatNumber](../functions/formatNumber.md)

### macro?

> `optional` **macro**: `ArrayLike`\<`string`\>

Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'])

### micro?

> `optional` **micro**: `ArrayLike`\<`string`\>

Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'])

### pad?

> `optional` **pad**: `number`

left padding to apply to numeric value

### precision?

> `optional` **precision**: `number`

Number of digits after the decimal point to display

### unit?

> `optional` **unit**: `number`

Multiplier for each level of suffixes (default: 1000)
