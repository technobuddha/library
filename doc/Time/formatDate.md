<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Time](./index.md) / formatDate

# Function: formatDate()

```ts
function formatDate(
   input: Date, 
   mask?: string, 
   options?: FormatDateOptions): string;
```

Defined in: [format-date.ts:100](https://github.com/technobuddha/library/blob/main/src/format-date.ts#L100)

Format a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `mask?` | `string` | The mask |
| `options?` | [`FormatDateOptions`](FormatDateOptions.md) | see [FormatDateOptions](FormatDateOptions.md) |

## Returns

`string`

## Default Value

```ts
utc false
```

