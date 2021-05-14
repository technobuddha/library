[@technobuddha/library](../..) / [Modules](../Modules.md) / delimited

# Module: delimited

## Table of contents

### References

- [default](delimited.md#default)

### Functions

- [delimited](delimited.md#delimited)

## References

### default

Renames and exports: [delimited](delimited.md#delimited)

## Functions

### delimited

▸ **delimited**(`input`: *string*, `delimiter`: *string*, `index?`: *number*, `count?`: *number*): *string*

Return a field from a delimited string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The delimited string |
| `delimiter` | *string* | - | The delimiter string |
| `index` | *number* | 0 | The position of the desired field, 0 is the first field, negative numbers count backwards from the end (default 0) |
| `count` | *number* | 1 | The number of fields to return (default 1) |

**Returns:** *string*

Defined in: [src/delimited.ts:11](../src/delimited.ts#L11)
