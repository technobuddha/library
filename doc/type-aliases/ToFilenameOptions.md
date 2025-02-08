[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / ToFilenameOptions

# Type Alias: ToFilenameOptions

> **ToFilenameOptions**: `object`

Defined in: [to-filename.ts:9](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L9)

## Type declaration

### disambiguate?

> `optional` **disambiguate**: `number`

number of characters to presere at the end of the filename when truncated (for disambiguation)

### maxLength?

> `optional` **maxLength**: `number`

the file name will be truncated to this length

### replacement?

> `optional` **replacement**: `string`

character to use to replace "bad" characters

### separator?

> `optional` **separator**: `string`

string to separate the main section from the disambiguated section
