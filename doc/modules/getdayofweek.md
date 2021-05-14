[@technobuddha/library](../..) / [Modules](../Modules.md) / getDayOfWeek

# Module: getDayOfWeek

## Table of contents

### References

- [default](getdayofweek.md#default)

### Functions

- [getDayOfWeek](getdayofweek.md#getdayofweek)

## References

### default

Renames and exports: [getDayOfWeek](getdayofweek.md#getdayofweek)

## Functions

### getDayOfWeek

▸ **getDayOfWeek**(`input`: Date, `__namedParameters?`: GetDayOfWeekOptions): [*DayOfWeek*](constants.md#dayofweek)

Determine the day of the week for a specific date

**`default`** UTC false

**`default`** startOfWeek Monday

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date | - | The date |
| `__namedParameters` | GetDayOfWeekOptions | {} | see [Options](almostequals.md#options) |

**Returns:** [*DayOfWeek*](constants.md#dayofweek)

The date value for midnight on the first day of the specified year

Defined in: [src/getDayOfWeek.ts:21](../../src/getDayOfWeek.ts#L21)
