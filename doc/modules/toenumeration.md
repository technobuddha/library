[@technobuddha/library](../..) / [Modules](../Modules.md) / toEnumeration

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

Convert a string to a boolean value

**`parm`** __namedParameters see [Options](almostequals.md#options)

**`defaults`** trueValues 'true', 'yes', 'y', 'on', or '1'

**`defaults`** falseValues 'false', 'no', 'n', 'off', '0'

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | The string to convert |
| `...tests` | (*Iterable*<string \| RegExp\> \| *string* \| RegExp)[] | - |

**Returns:** *number* \| *undefined*

true, false or undefined if the string doesn't match

Defined in: [src/toEnumeration.ts:12](../src/toEnumeration.ts#L12)
