<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / ToFilenameOptions

# Type Alias: ToFilenameOptions

> **ToFilenameOptions** = \{ `disambiguate?`: `number`; `maxLength?`: `number`; `replacement?`: `string`; `separator?`: `string`; \}

Defined in: [to-filename.ts:13](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L13)

## Properties

### disambiguate?

> `optional` **disambiguate**: `number`

Defined in: [to-filename.ts:19](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L19)

number of characters to preserve at the end of the filename when truncated (for disambiguation)

***

### maxLength?

> `optional` **maxLength**: `number`

Defined in: [to-filename.ts:15](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L15)

the file name will be truncated to this length

***

### replacement?

> `optional` **replacement**: `string`

Defined in: [to-filename.ts:17](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L17)

character to use to replace "bad" characters

***

### separator?

> `optional` **separator**: `string`

Defined in: [to-filename.ts:21](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L21)

string to separate the main section from the disambiguated section
