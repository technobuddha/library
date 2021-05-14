[@technobuddha/library](../..) / [Modules](../Modules.md) / plural

# Module: plural

## Table of contents

### References

- [default](plural.md#default)

### Functions

- [plural](plural.md#plural)

## References

### default

Renames and exports: [plural](plural.md#plural)

## Functions

### plural

▸ **plural**(`input`: *string*, `quantity?`: *number*): *string*

Return the plural version of the input string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | The word to pluralize |
| `quantity?` | *number* | The quantity to prepend to the word.  If omitted nothing is prepended.  If quantity is one the singular form is returned. |

**Returns:** *string*

The plural form of the input, or if a quantity is supplied - the quantity and the singular/plural form of the input (whichever is appropriate)

Defined in: [src/plural.ts:12](../src/plural.ts#L12)
