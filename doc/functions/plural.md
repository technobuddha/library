<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / plural

# Function: plural()

> **plural**(`input`: `string`, `quantity?`: `number`): `string`

Defined in: [plural.ts:15](https://github.com/technobuddha/library/blob/main/src/plural.ts#L15)

Return the plural version of the input string

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The word to pluralize |
| `quantity?` | `number` | The quantity to prepend to the word. If omitted nothing is prepended. If quantity is one the singular form is returned. |

## Returns

`string`

The plural form of the input, or if a quantity is supplied - the quantity and the singular/plural form of the input (whichever is appropriate)
