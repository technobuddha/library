<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / getOccurrenceInMonth

# Function: getOccurrenceInMonth()

> **getOccurrenceInMonth**(`input`, `dayOfWeek`, `occurrence`, `__namedParameters`): `Date` \| `null`

Defined in: [get-occurrence-in-month.ts:23](https://github.com/technobuddha/library/blob/main/src/get-occurrence-in-month.ts#L23)

Determine the date of an occurrence of a weekday within a month

## Parameters

### input

`Date`

A date within the month in question

### dayOfWeek

[`DayOfWeek`](../type-aliases/DayOfWeek.md)

The day of the week to find the occurrence

### occurrence

The occurrence number, or 'last' to find the last occurrence

`number` | `"last"`

### \_\_namedParameters

[`GetOccurrenceInMonthOptions`](../type-aliases/GetOccurrenceInMonthOptions.md) = `{}`

see [GetOccurrenceInMonthOptions](../type-aliases/GetOccurrenceInMonthOptions.md)

## Returns

`Date` \| `null`

A date object corresponding to the occurrence requested, or null if no such date exists in the month

## Default Value

```ts
utc false
```
