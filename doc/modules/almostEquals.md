[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / almostEquals

# Module: almostEquals

## Table of contents

### References

- [default](almostEquals.md#default)

### Type aliases

- [Options](almostEquals.md#options)

### Functions

- [almostEquals](almostEquals.md#almostequals)

## References

### default

Renames and exports: [almostEquals](almostEquals.md#almostequals)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `tolerance?` | `number` | Tolerance range. If specified, should be greater than 0. |

#### Defined in

[almostEquals.ts:1](../../src/almostEquals.ts#L1)

## Functions

### almostEquals

▸ **almostEquals**(`a`, `b`, `__namedParameters?`): `boolean`

Tests whether the two values are equal to each other, within a certain
tolerance, taking into account floating point errors (numbers within EPSILON).

**`default`** tolerance 0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `number` | First number to compare. |
| `b` | `number` | Second number to compare. |
| `__namedParameters` | [`Options`](almostEquals.md#options) | see [Options](almostEquals.md#options) |

#### Returns

`boolean`

true if *a* and *b* are nearly equal.

#### Defined in

[almostEquals.ts:16](../../src/almostEquals.ts#L16)
