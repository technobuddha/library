[@technobuddha/library](../..) / [Modules](../Modules.md) / binaryUnits

# Module: binaryUnits

## Table of contents

### References

- [default](binaryunits.md#default)

### Type aliases

- [Options](binaryunits.md#options)

### Functions

- [binaryUnits](binaryunits.md#binaryunits)

## References

### default

Renames and exports: [binaryUnits](binaryunits.md#binaryunits)

## Type aliases

### Options

Ƭ **Options**: *Omit*<[*Options*](metricunits.md#options), ``"macro"`` \| ``"micro"`` \| ``"unit"``\>

Defined in: [binaryUnits.ts:4](../../src/binaryUnits.ts#L4)

## Functions

### binaryUnits

▸ **binaryUnits**(`input`: *number*, `__namedParameters?`: [*Options*](binaryunits.md#options)): *string*

Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 => 1K)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *number* | - | The number to abbreviate |
| `__namedParameters` | [*Options*](binaryunits.md#options) | {} | see {@link BinaryUnitsOptions} } |

**Returns:** *string*

Defined in: [packages/library/src/binaryUnits.ts:12](../../src/binaryUnits.ts#L12)
