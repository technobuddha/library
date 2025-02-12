<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / getBeginningOfDay

# Function: getBeginningOfDay()

> **getBeginningOfDay**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `__namedParameters`: [`GetBeginningOfDayOptions`](../type-aliases/GetBeginningOfDayOptions.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [get-beginning-of-day.ts:20](https://github.com/technobuddha/library/blob/main/src/get-beginning-of-day.ts#L20)

Determine the start of the day for a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `__namedParameters` | [`GetBeginningOfDayOptions`](../type-aliases/GetBeginningOfDayOptions.md) | see [GetBeginningOfDayOptions](../type-aliases/GetBeginningOfDayOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

The date value for midnight on the specified day

## Default Value

```ts
utc false
```
