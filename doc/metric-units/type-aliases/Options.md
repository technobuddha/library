[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [metric-units](../README.md) / Options

# Type Alias: Options

> **Options**: `object`

## Type declaration

### format?

> `optional` **format**: `string`

format specification to pass to @link{formatNumber}

### macro?

> `optional` **macro**: `ArrayLike`\<`string`\>

Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q'])

### micro?

> `optional` **micro**: `ArrayLike`\<`string`\>

Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y', 'r', 'q'])

### pad?

> `optional` **pad**: `number`

left padding to apply to numeric value

### precision?

> `optional` **precision**: `number`

Number of digits after the decimal point to display

### unit?

> `optional` **unit**: `number`

Multiplier for each level of suffixes (default: 1000)

## Defined in

[metric-units.ts:6](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/metric-units.ts#L6)
