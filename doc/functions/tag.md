<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / tag

# Function: tag()

> **tag**(`input`: `string`, `tagName`: `string`, `attributes`: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `string`\>): `string`

Defined in: [tag.ts:15](https://github.com/technobuddha/library/blob/main/src/tag.ts#L15)

Surround text with an HTML tag

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `string` | `undefined` | The text to surround |
| `tagName` | `string` | `'span'` | The name of the tag |
| `attributes` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `string`\> | `{}` | A dictionary of name value pairs to use for attributes |

## Returns

`string`

HTML tag with text
