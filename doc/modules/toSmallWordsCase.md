[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / toSmallWordsCase

# Module: toSmallWordsCase

## Table of contents

### References

- [default](toSmallWordsCase.md#default)

### Type aliases

- [Options](toSmallWordsCase.md#options)

### Functions

- [toSmallWordsCase](toSmallWordsCase.md#tosmallwordscase)

## References

### default

Renames and exports: [toSmallWordsCase](toSmallWordsCase.md#tosmallwordscase)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `upperCase?` | `boolean` | Convert other characters in the string to upper case |

#### Defined in

[toSmallWordsCase.ts:1](../../src/toSmallWordsCase.ts#L1)

## Functions

### toSmallWordsCase

▸ **toSmallWordsCase**(`input`, `__namedParameters?`): `string`

Convert the first letter of each word in a string to lower case

**`default`** upperCase false

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string to make small case |
| `__namedParameters` | [`Options`](toSmallWordsCase.md#options) | - |

#### Returns

`string`

string in small case

#### Defined in

[toSmallWordsCase.ts:13](../../src/toSmallWordsCase.ts#L13)
