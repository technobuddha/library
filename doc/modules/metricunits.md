[@technobuddha/library](../..) / [Modules](../Modules.md) / metricUnits

# Module: metricUnits

## Table of contents

### References

- [default](metricunits.md#default)

### Type aliases

- [Options](metricunits.md#options)

### Functions

- [metricUnits](metricunits.md#metricunits)

## References

### default

Renames and exports: [metricUnits](metricunits.md#metricunits)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `format?` | *string* | format specification to pass to @link{formatNumber} |
| `macro?` | *ArrayLike*<string\> | Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y']) |
| `micro?` | *ArrayLike*<string\> | Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y']) |
| `pad?` | *number* | left padding to apply to numeric value |
| `precision?` | *number* | Number of digits after the decimal point to display |
| `unit?` | *number* | Multiplier for each level of suffixes (default: 1000) |

Defined in: [src/metricUnits.ts:6](../../src/metricUnits.ts#L6)

## Functions

### metricUnits

▸ **metricUnits**(`input`: *number*, `__namedParameters?`: [*Options*](metricunits.md#options)): *string*

Abbreviate a number by adding a suffix for metric units (i.e. 1000 => 1K, .0001 = 1m)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *number* | - | The number to abbreviate |
| `__namedParameters` | [*Options*](metricunits.md#options) | {} | {@link MetricUnitOptions} |

**Returns:** *string*

Defined in: [src/metricUnits.ts:39](../../src/metricUnits.ts#L39)
