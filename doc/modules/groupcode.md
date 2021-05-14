[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / groupCode

# Module: groupCode

## Table of contents

### References

- [default](groupcode.md#default)

### Functions

- [groupCode](groupcode.md#groupcode)

## References

### default

Renames and exports: [groupCode](groupcode.md#groupcode)

## Functions

### groupCode

▸ **groupCode**(`input`: *string*): *string*

Determine the group code (A-Z, [] or #) to place an item under

**`remarks`** The group code is made by taking the first letter of the *desription*.  As a special
case descriptions starting with '[' are grouped under [] and anything that isn't a letter is grouped
under #.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | a description |

**Returns:** *string*

The group code

Defined in: [src/groupCode.ts:14](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/groupCode.ts#L14)
