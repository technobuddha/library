[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / parseDate

# Module: parseDate

## Table of contents

### References

- [default](parseDate.md#default)

### Functions

- [parseDate](parseDate.md#parsedate)

## References

### default

Renames and exports: [parseDate](parseDate.md#parsedate)

## Functions

### parseDate

▸ **parseDate**(`text`): `Date`

Parse a string into a Date object

**`remarks`** this is a little more generous about what formats it will take for a date, and if it can't match the input to one of it's supported formats it falls
back to new Date(text)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The string containing a date |

#### Returns

`Date`

new Date object

#### Defined in

[parseDate.ts:52](../../src/parseDate.ts#L52)
