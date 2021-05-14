[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / toFilename

# Module: toFilename

## Table of contents

### References

- [default](tofilename.md#default)

### Type aliases

- [Options](tofilename.md#options)

### Functions

- [toFilename](tofilename.md#tofilename)

## References

### default

Renames and exports: [toFilename](tofilename.md#tofilename)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `disambiguate?` | *number* | number of characters to presere at the end of the filename when truncated (for disambiguation) |
| `maxLength?` | *number* | the file name will be truncated to this length |
| `replacement?` | *string* | character to use to replace "bad" characters |
| `separator?` | *string* | string to seperate the main section from the disambiguated section |

Defined in: [src/toFilename.ts:8](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/toFilename.ts#L8)

## Functions

### toFilename

▸ **toFilename**(`input`: *string*, `__namedParameters?`: [*Options*](tofilename.md#options)): *string*

Convert a string so that it can be used as a filename

**`default`** maxLength 64

**`default`** replacement - (dash)

**`default`** disambiguate 10

**`default`** separator … (ellipsis)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The string to escape |
| `__namedParameters` | [*Options*](tofilename.md#options) | {} | see [Options](tofilename.md#options) |

**Returns:** *string*

the tfile name

Defined in: [src/toFilename.ts:30](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/toFilename.ts#L30)
