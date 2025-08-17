<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / getEndOfWeek

# Function: getEndOfWeek()

> **getEndOfWeek**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `__namedParameters`: [`GetEndOfWeekOptions`](GetEndOfWeekOptions.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [get-end-of-week.ts:26](https://github.com/technobuddha/library/blob/main/src/get-end-of-week.ts#L26)

Determine the last day of the week containing a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `__namedParameters` | [`GetEndOfWeekOptions`](GetEndOfWeekOptions.md) | see [GetEndOfWeekOptions](GetEndOfWeekOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Midnight of the last day of the week containing the input date

## Default Value

```ts
utc false
```
