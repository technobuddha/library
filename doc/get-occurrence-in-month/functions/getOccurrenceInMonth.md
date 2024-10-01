[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [get-occurrence-in-month](../README.md) / getOccurrenceInMonth

# Function: getOccurrenceInMonth()

> **getOccurrenceInMonth**(`input`, `dayOfWeek`, `occurrence`, `__namedParameters`): `Date` \| `null`

Determine the date of an occurrence of a weekday within a month

## Parameters

• **input**: `Date`

A date within the month in question

• **dayOfWeek**: [`DayOfWeek`](../../constants/type-aliases/DayOfWeek.md)

The day of the week to find the occurrence

• **occurrence**: `number` \| `"last"`

The occurrence number, or 'last' to find the last occurrence

• **\_\_namedParameters**: `Options` = `{}`

see Options

## Returns

`Date` \| `null`

A date object corresponding to the occurrence requested, or null if no such date exists in the month

## Default Value

```ts
UTC false
```

## Defined in

get-occurrence-in-month.ts:23
