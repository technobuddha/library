[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getOccurrenceInMonth

# Module: getOccurrenceInMonth

## Table of contents

### References

- [default](getOccurrenceInMonth.md#default)

### Functions

- [getOccurrenceInMonth](getOccurrenceInMonth.md#getoccurrenceinmonth)

## References

### default

Renames and exports: [getOccurrenceInMonth](getOccurrenceInMonth.md#getoccurrenceinmonth)

## Functions

### getOccurrenceInMonth

▸ **getOccurrenceInMonth**(`input`, `dayOfWeek`, `occurrence`, `__namedParameters?`): `Date` \| ``null``

Determine the date of an occurrence of a weekday within a month

**`defaultvalue`** UTC false

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` | A date within the month in question |
| `dayOfWeek` | [`DayOfWeek`](constants.md#dayofweek) | The day of the week to find the occurrence |
| `occurrence` | `number` \| ``"last"`` | The occurrence number, or 'last' to find the last occurrence |
| `__namedParameters` | `Options` | see [Options](almostEquals.md#options) |

#### Returns

`Date` \| ``null``

A date object corresponding to the occurrence requested, or null if no such date exists in the month

#### Defined in

[getOccurrenceInMonth.ts:23](../../src/getOccurrenceInMonth.ts#L23)
