<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / getISOWeeksInYear

# Function: getISOWeeksInYear()

> **getISOWeeksInYear**(`input`: `number` \| [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `__namedParameters`: [`GetISOWeeksInYearOptions`](../type-aliases/GetISOWeeksInYearOptions.md)): `number`

Defined in: [get-iso-weeks-in-year.ts:28](https://github.com/technobuddha/library/blob/main/src/get-iso-weeks-in-year.ts#L28)

Determine the number of ISO weeks within a year

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` \| [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | A date within the year, or a year number |
| `__namedParameters` | [`GetISOWeeksInYearOptions`](../type-aliases/GetISOWeeksInYearOptions.md) | see [GetISOWeeksInYearOptions](../type-aliases/GetISOWeeksInYearOptions.md) |

## Returns

`number`

The number of weeks in the year (52 or 53)

## Default Value

```ts
weekOneIncludes Thursday
```
