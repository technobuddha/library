[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / toEnumeration

# Module: toEnumeration

## Table of contents

### References

- [default](toenumeration.md#default)

### Functions

- [toEnumeration](toenumeration.md#toenumeration)

## References

### default

Renames and exports: [toEnumeration](toenumeration.md#toenumeration)

## Functions

### toEnumeration

▸ **toEnumeration**(`input`: *string*, ...`tests`: (*Iterable*<string \| RegExp\> \| *string* \| RegExp)[]): *number* \| *undefined*

Convert a string to a numeric value

**`parm`** __namedParameters see [Options](almostequals.md#options)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | The string to convert |
| `...tests` | (*Iterable*<string \| RegExp\> \| *string* \| RegExp)[] | Array of tests (string value or regular expressions) |

**Returns:** *number* \| *undefined*

The index of the first test to match the input string

Defined in: [toEnumeration.ts:11](../../src/toEnumeration.ts#L11)
