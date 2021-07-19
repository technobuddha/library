[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / mask

# Module: mask

## Table of contents

### References

- [default](mask.md#default)

### Functions

- [mask](mask.md#mask)

## References

### default

Renames and exports: [mask](mask.md#mask)

## Functions

### mask

▸ **mask**(`input`, `maskStr`, `__namedParameters?`): `string`

Use a simple mask to display a string

**`remark`** The simple mask is a string where '#' characters are replaced by characters from the input string.  Other characters in the mask
are output as-is, to output a '#' use '\#'

**`default`** missing space

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string |
| `maskStr` | `string` | - |
| `__namedParameters` | `Options` | see [Options](almostEquals.md#options) |

#### Returns

`string`

The mask filled with characters from the string

#### Defined in

[mask.ts:23](../../src/mask.ts#L23)
