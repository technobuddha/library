[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / toSmallWordsCase

# Module: toSmallWordsCase

## Table of contents

### References

- [default](tosmallwordscase.md#default)

### Type aliases

- [Options](tosmallwordscase.md#options)

### Functions

- [toSmallWordsCase](tosmallwordscase.md#tosmallwordscase)

## References

### default

Renames and exports: [toSmallWordsCase](tosmallwordscase.md#tosmallwordscase)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `upperCase?` | *boolean* | Convert other characters in the string to upper case |

Defined in: [toSmallWordsCase.ts:1](../../src/toSmallWordsCase.ts#L1)

## Functions

### toSmallWordsCase

▸ **toSmallWordsCase**(`input`: *string*, `__namedParameters?`: [*Options*](tosmallwordscase.md#options)): *string*

Convert the first letter of each word in a string to lower case

**`default`** upperCase false

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The string to make small case |
| `__namedParameters` | [*Options*](tosmallwordscase.md#options) | {} | - |

**Returns:** *string*

string in small case

Defined in: [toSmallWordsCase.ts:13](../../src/toSmallWordsCase.ts#L13)
