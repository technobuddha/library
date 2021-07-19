[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getDayOfWeek

# Module: getDayOfWeek

## Table of contents

### References

- [default](getDayOfWeek.md#default)

### Functions

- [getDayOfWeek](getDayOfWeek.md#getdayofweek)

## References

### default

Renames and exports: [getDayOfWeek](getDayOfWeek.md#getdayofweek)

## Functions

### getDayOfWeek

▸ **getDayOfWeek**(`input`, `__namedParameters?`): [`DayOfWeek`](constants.md#dayofweek)

Determine the day of the week for a specific date

**`default`** UTC false

**`default`** startOfWeek Monday

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` | The date |
| `__namedParameters` | `GetDayOfWeekOptions` | see [Options](almostEquals.md#options) |

#### Returns

[`DayOfWeek`](constants.md#dayofweek)

The date value for midnight on the first day of the specified year

#### Defined in

[getDayOfWeek.ts:21](../../src/getDayOfWeek.ts#L21)
