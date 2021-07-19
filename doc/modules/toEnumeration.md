[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / toEnumeration

# Module: toEnumeration

## Table of contents

### References

- [default](toEnumeration.md#default)

### Functions

- [toEnumeration](toEnumeration.md#toenumeration)

## References

### default

Renames and exports: [toEnumeration](toEnumeration.md#toenumeration)

## Functions

### toEnumeration

▸ **toEnumeration**(`input`, ...`tests`): `number` \| `undefined`

Convert a string to a numeric value

**`parm`** __namedParameters see [Options](almostEquals.md#options)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to convert |
| `...tests` | (`Iterable`<`string` \| `RegExp`\> \| `string` \| `RegExp`)[] | Array of tests (string value or regular expressions) |

#### Returns

`number` \| `undefined`

The index of the first test to match the input string

#### Defined in

[toEnumeration.ts:11](../../src/toEnumeration.ts#L11)
