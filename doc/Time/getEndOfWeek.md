<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / getEndOfWeek

# Function: getEndOfWeek()

> **getEndOfWeek**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `options`: [`EndOfWeekOptions`](EndOfWeekOptions.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [get-end-of-week.ts:28](https://github.com/technobuddha/library/blob/main/src/get-end-of-week.ts#L28)

Determine the last day of the week containing a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`EndOfWeekOptions`](EndOfWeekOptions.md) | see [EndOfWeekOptions](EndOfWeekOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Midnight of the last day of the week containing the input date

## Default Value

```ts
utc false
```
