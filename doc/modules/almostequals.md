[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / almostEquals

# Module: almostEquals

## Table of contents

### References

- [default](almostequals.md#default)

### Type aliases

- [Options](almostequals.md#options)

### Functions

- [almostEquals](almostequals.md#almostequals)

## References

### default

Renames and exports: [almostEquals](almostequals.md#almostequals)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `tolerance?` | *number* | Tolerance range. If specified, should be greater than 0. |

Defined in: [src/almostEquals.ts:1](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/almostEquals.ts#L1)

## Functions

### almostEquals

▸ **almostEquals**(`a`: *number*, `b`: *number*, `__namedParameters?`: [*Options*](almostequals.md#options)): *boolean*

Tests whether the two values are equal to each other, within a certain
tolerance, taking into account floating point errors (numbers within EPSILON).

**`default`** tolerance 0

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | *number* | - | First number to compare. |
| `b` | *number* | - | Second number to compare. |
| `__namedParameters` | [*Options*](almostequals.md#options) | {} | see [Options](almostequals.md#options) |

**Returns:** *boolean*

true if *a* and *b* are nearly equal.

Defined in: [src/almostEquals.ts:16](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/almostEquals.ts#L16)
