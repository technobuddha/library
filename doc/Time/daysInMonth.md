<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Time](./index.md) / daysInMonth

# Function: daysInMonth()

```ts
function daysInMonth(input: Date, options: DaysInMonthOptions): number;
```

Defined in: [days-in-month.ts:25](https://github.com/technobuddha/library/blob/main/src/days-in-month.ts#L25)

Determine the number of days in the month for a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`DaysInMonthOptions`](DaysInMonthOptions.md) | see [DaysInMonthOptions](DaysInMonthOptions.md) |

## Returns

`number`

The number of days in the specified month

## Default Value

```ts
utc false
```

