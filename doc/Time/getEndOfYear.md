<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / getEndOfYear

# Function: getEndOfYear()

> **getEndOfYear**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `options`: [`EndOfYearOptions`](EndOfYearOptions.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [get-end-of-year.ts:23](https://github.com/technobuddha/library/blob/main/src/get-end-of-year.ts#L23)

Determine the last day of the year containing a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`EndOfYearOptions`](EndOfYearOptions.md) | see [EndOfYearOptions](EndOfYearOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Midnight of the last day of the year containing the input date

## Default Value

```ts
utc false
```
