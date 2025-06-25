<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / getISOWeekOfYear

# Function: getISOWeekOfYear()

> **getISOWeekOfYear**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `__namedParameteres`: [`GetISOWeekOfYearOptions`](../type-aliases/GetISOWeekOfYearOptions.md)): \{ `week`: `number`; `year`: `number`; \}

Defined in: [get-iso-week-of-year.ts:31](https://github.com/technobuddha/library/blob/main/src/get-iso-week-of-year.ts#L31)

Determine the ISO week number for a given date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `__namedParameteres` | [`GetISOWeekOfYearOptions`](../type-aliases/GetISOWeekOfYearOptions.md) | see [GetISOWeekOfYearOptions](../type-aliases/GetISOWeekOfYearOptions.md) |

## Returns

\{ `week`: `number`; `year`: `number`; \}

the week number (1-53)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `week` | `number` | [get-iso-week-of-year.ts:38](https://github.com/technobuddha/library/blob/main/src/get-iso-week-of-year.ts#L38) |
| `year` | `number` | [get-iso-week-of-year.ts:38](https://github.com/technobuddha/library/blob/main/src/get-iso-week-of-year.ts#L38) |

## Default Value

```ts
weekOneIncludes Thursday
```

## Default Value

```ts
firstDayOfWeek Monday
```
