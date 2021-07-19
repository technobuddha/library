[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / toFilename

# Module: toFilename

## Table of contents

### References

- [default](toFilename.md#default)

### Type aliases

- [Options](toFilename.md#options)

### Functions

- [toFilename](toFilename.md#tofilename)

## References

### default

Renames and exports: [toFilename](toFilename.md#tofilename)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `disambiguate?` | `number` | number of characters to presere at the end of the filename when truncated (for disambiguation) |
| `maxLength?` | `number` | the file name will be truncated to this length |
| `replacement?` | `string` | character to use to replace "bad" characters |
| `separator?` | `string` | string to seperate the main section from the disambiguated section |

#### Defined in

[toFilename.ts:8](../../src/toFilename.ts#L8)

## Functions

### toFilename

▸ **toFilename**(`input`, `__namedParameters?`): `string`

Convert a string so that it can be used as a filename

**`default`** maxLength 64

**`default`** replacement - (dash)

**`default`** disambiguate 10

**`default`** separator … (ellipsis)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to escape |
| `__namedParameters` | [`Options`](toFilename.md#options) | see [Options](toFilename.md#options) |

#### Returns

`string`

the tfile name

#### Defined in

[toFilename.ts:30](../../src/toFilename.ts#L30)
