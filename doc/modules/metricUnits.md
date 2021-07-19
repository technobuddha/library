[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / metricUnits

# Module: metricUnits

## Table of contents

### References

- [default](metricUnits.md#default)

### Type aliases

- [Options](metricUnits.md#options)

### Functions

- [metricUnits](metricUnits.md#metricunits)

## References

### default

Renames and exports: [metricUnits](metricUnits.md#metricunits)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `format?` | `string` | format specification to pass to @link{formatNumber} |
| `macro?` | `ArrayLike`<`string`\> | Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y']) |
| `micro?` | `ArrayLike`<`string`\> | Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y']) |
| `pad?` | `number` | left padding to apply to numeric value |
| `precision?` | `number` | Number of digits after the decimal point to display |
| `unit?` | `number` | Multiplier for each level of suffixes (default: 1000) |

#### Defined in

[metricUnits.ts:6](../../src/metricUnits.ts#L6)

## Functions

### metricUnits

▸ **metricUnits**(`input`, `__namedParameters?`): `string`

Abbreviate a number by adding a suffix for metric units (i.e. 1000 => 1K, .0001 = 1m)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `number` | The number to abbreviate |
| `__namedParameters` | [`Options`](metricUnits.md#options) | {@link MetricUnitOptions} |

#### Returns

`string`

#### Defined in

[metricUnits.ts:39](../../src/metricUnits.ts#L39)
