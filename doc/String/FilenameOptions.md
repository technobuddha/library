<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / FilenameOptions

# Type Alias: FilenameOptions

```ts
type FilenameOptions = {
  disambiguate?: number;
  maxLength?: number;
  replacement?: string;
  separator?: string;
};
```

Defined in: [to-filename.ts:13](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L13)

Options for the [toFilename](toFilename.md) function

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="disambiguate"></a> `disambiguate?` | `number` | number of characters to preserve at the end of the filename when truncated (for disambiguation) | [to-filename.ts:19](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L19) |
| <a id="maxlength"></a> `maxLength?` | `number` | the file name will be truncated to this length | [to-filename.ts:15](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L15) |
| <a id="replacement"></a> `replacement?` | `string` | character to use to replace "bad" characters | [to-filename.ts:17](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L17) |
| <a id="separator"></a> `separator?` | `string` | string to separate the main section from the disambiguated section | [to-filename.ts:21](https://github.com/technobuddha/library/blob/main/src/to-filename.ts#L21) |

