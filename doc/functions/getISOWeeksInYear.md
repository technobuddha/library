[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / getISOWeeksInYear

# Function: getISOWeeksInYear()

> **getISOWeeksInYear**(`input`, `__namedParameters`): `number`

Defined in: [get-iso-weeks-in-year.ts:22](https://github.com/technobuddha/library/blob/main/src/get-iso-weeks-in-year.ts#L22)

Determine the number of ISO weeks within a year

## Parameters

### input

A date within the year, or a year number

`number` | `Date`

### \_\_namedParameters

[`GetISOWeeksInYearOptions`](../type-aliases/GetISOWeeksInYearOptions.md) = `{}`

see [GetISOWeeksInYearOptions](../type-aliases/GetISOWeeksInYearOptions.md)

## Returns

`number`

The number of weeks in the year (52 or 53)

## Default Value

```ts
weekOneIncludes Thursday
```
