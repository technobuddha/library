<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / isoWeekOfYear

# Function: isoWeekOfYear()

> **isoWeekOfYear**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `options`: [`ISOWeekOfYearOptions`](ISOWeekOfYearOptions.md)): \{ `week`: `number`; `year`: `number`; \}

Defined in: iso-week-of-year.ts:32

Determine the ISO week number for a given date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`ISOWeekOfYearOptions`](ISOWeekOfYearOptions.md) | see [ISOWeekOfYearOptions](ISOWeekOfYearOptions.md) |

## Returns

\{ `week`: `number`; `year`: `number`; \}

the week number (1-53)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `week` | `number` | iso-week-of-year.ts:39 |
| `year` | `number` | iso-week-of-year.ts:39 |

## Default Value

```ts
weekOneIncludes Thursday
```

## Default Value

```ts
firstDayOfWeek Monday
```
