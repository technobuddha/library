<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / getEndOfYear

# Function: getEndOfYear()

> **getEndOfYear**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `__namedParameters`: [`GetEndOfYearOptions`](../type-aliases/GetEndOfYearOptions.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [get-end-of-year.ts:22](https://github.com/technobuddha/library/blob/main/src/get-end-of-year.ts#L22)

Determine the last day of the year containing a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `__namedParameters` | [`GetEndOfYearOptions`](../type-aliases/GetEndOfYearOptions.md) | see [GetEndOfYearOptions](../type-aliases/GetEndOfYearOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Midnight of the last day of the year containing the input date

## Default Value

```ts
utc false
```
