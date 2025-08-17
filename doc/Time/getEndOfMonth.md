<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / getEndOfMonth

# Function: getEndOfMonth()

> **getEndOfMonth**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `__namedParameters`: [`GetEndOfMonthOptions`](GetEndOfMonthOptions.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [get-end-of-month.ts:22](https://github.com/technobuddha/library/blob/main/src/get-end-of-month.ts#L22)

Determine the last day of the month containing the input date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `__namedParameters` | [`GetEndOfMonthOptions`](GetEndOfMonthOptions.md) | see [GetEndOfMonthOptions](GetEndOfMonthOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Midnight on the last day of the month corresponding to the input date

## Default Value

```ts
utc false
```
