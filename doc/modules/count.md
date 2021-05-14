[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / count

# Module: count

## Table of contents

### References

- [default](count.md#default)

### Type aliases

- [Options](count.md#options)

### Functions

- [count](count.md#count)

## References

### default

Renames and exports: [count](count.md#count)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `overlap?` | *boolean* | if true, counts overlapping strings |

Defined in: [src/count.ts:1](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/count.ts#L1)

## Functions

### count

▸ **count**(`input`: *string*, `substring`: *string*, `__namedParameters?`: [*Options*](count.md#options)): *number*

Compute the number of times a substring occors within a string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The string |
| `substring` | *string* | - | - |
| `__namedParameters` | [*Options*](count.md#options) | {} | see [Options](count.md#options) |

**Returns:** *number*

number of times *substring* occurs within *input*

Defined in: [src/count.ts:14](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/count.ts#L14)
