[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getEndOfWeek

# Module: getEndOfWeek

## Table of contents

### References

- [default](getendofweek.md#default)

### Functions

- [getEndOfWeek](getendofweek.md#getendofweek)

## References

### default

Renames and exports: [getEndOfWeek](getendofweek.md#getendofweek)

## Functions

### getEndOfWeek

▸ **getEndOfWeek**(`input`: Date, `__namedParameters?`: Options): Date

Determine the last day of the week containing a date

**`default`** UTC false

**`default`** firstDayOfWeek Sunday

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date | - | The date |
| `__namedParameters` | Options | {} | see [Options](almostequals.md#options) |

**Returns:** Date

Midnight of the last day of the week containing the input date

Defined in: [src/getEndOfWeek.ts:21](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/getEndOfWeek.ts#L21)
