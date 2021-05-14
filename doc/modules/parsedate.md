[@technobuddha/library](../..) / [Modules](../Modules.md) / parseDate

# Module: parseDate

## Table of contents

### References

- [default](parsedate.md#default)

### Functions

- [parseDate](parsedate.md#parsedate)

## References

### default

Renames and exports: [parseDate](parsedate.md#parsedate)

## Functions

### parseDate

▸ **parseDate**(`text`: *string*): Date

Parse a string into a Date object

**`remarks`** this is a little more generous about what formats it will take for a date, and if it can't match the input to one of it's supported formats it falls
back to new Date(text)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | *string* | The string containing a date |

**Returns:** Date

new Date object

Defined in: [src/parseDate.ts:54](../src/parseDate.ts#L54)
