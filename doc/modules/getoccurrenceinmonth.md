[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getOccurrenceInMonth

# Module: getOccurrenceInMonth

## Table of contents

### References

- [default](getoccurrenceinmonth.md#default)

### Functions

- [getOccurrenceInMonth](getoccurrenceinmonth.md#getoccurrenceinmonth)

## References

### default

Renames and exports: [getOccurrenceInMonth](getoccurrenceinmonth.md#getoccurrenceinmonth)

## Functions

### getOccurrenceInMonth

▸ **getOccurrenceInMonth**(`input`: Date, `dayOfWeek`: [*DayOfWeek*](constants.md#dayofweek), `occurrence`: *number* \| ``"last"``, `__namedParameters?`: Options): Date \| ``null``

Determine the date of an occurrence of a weekday within a month

**`defaultvalue`** UTC false

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date | - | A date within the month in question |
| `dayOfWeek` | [*DayOfWeek*](constants.md#dayofweek) | - | The day of the week to find the occurrence |
| `occurrence` | *number* \| ``"last"`` | - | The occurrence number, or 'last' to find the last occurrence |
| `__namedParameters` | Options | {} | see [Options](almostequals.md#options) |

**Returns:** Date \| ``null``

A date object corresponding to the occurrence requested, or null if no such date exists in the month

Defined in: [src/getOccurrenceInMonth.ts:23](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/getOccurrenceInMonth.ts#L23)
