[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / clean

# Module: clean

## Table of contents

### References

- [default](clean.md#default)

### Functions

- [clean](clean.md#clean)
- [cleanEnd](clean.md#cleanend)
- [cleanStart](clean.md#cleanstart)

## References

### default

Renames and exports: [clean](clean.md#clean)

## Functions

### clean

▸ **clean**(`input`: *string*, `characters?`: *string* \| RegExp \| (*string* \| RegExp)[]): *string*

Remove all occurrences of characters from the beginning and end of the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | The string |
| `characters` | *string* \| RegExp \| (*string* \| RegExp)[] | The characters(s) to remove |

**Returns:** *string*

Defined in: [src/clean.ts:15](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/clean.ts#L15)

___

### cleanEnd

▸ **cleanEnd**(`input`: *string*, `characters?`: *string* \| RegExp \| (*string* \| RegExp)[]): *string*

Remove all occurrences of characters from the end of the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | The string |
| `characters` | *string* \| RegExp \| (*string* \| RegExp)[] | he characters(s) to remove |

**Returns:** *string*

Defined in: [src/clean.ts:33](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/clean.ts#L33)

___

### cleanStart

▸ **cleanStart**(`input`: *string*, `characters?`: *string* \| RegExp \| (*string* \| RegExp)[]): *string*

Remove all occurrences of characters from the start of the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | The string |
| `characters` | *string* \| RegExp \| (*string* \| RegExp)[] | The characters(s) to remove |

**Returns:** *string*

Defined in: [src/clean.ts:51](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/clean.ts#L51)
