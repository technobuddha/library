[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / binaryUnits

# Module: binaryUnits

## Table of contents

### References

- [default](binaryUnits.md#default)

### Type aliases

- [Options](binaryUnits.md#options)

### Functions

- [binaryUnits](binaryUnits.md#binaryunits)

## References

### default

Renames and exports: [binaryUnits](binaryUnits.md#binaryunits)

## Type aliases

### Options

Ƭ **Options**: `Omit`<[`Options`](metricUnits.md#options), ``"macro"`` \| ``"micro"`` \| ``"unit"``\>

#### Defined in

[binaryUnits.ts:4](../../src/binaryUnits.ts#L4)

## Functions

### binaryUnits

▸ **binaryUnits**(`input`, `__namedParameters?`): `string`

Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 => 1K)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `number` | The number to abbreviate |
| `__namedParameters` | [`Options`](binaryUnits.md#options) | see {@link BinaryUnitsOptions} } |

#### Returns

`string`

#### Defined in

[binaryUnits.ts:12](../../src/binaryUnits.ts#L12)
