[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getEndOfWeek

# Module: getEndOfWeek

## Table of contents

### References

- [default](getEndOfWeek.md#default)

### Functions

- [getEndOfWeek](getEndOfWeek.md#getendofweek)

## References

### default

Renames and exports: [getEndOfWeek](getEndOfWeek.md#getendofweek)

## Functions

### getEndOfWeek

▸ **getEndOfWeek**(`input`, `__namedParameters?`): `Date`

Determine the last day of the week containing a date

**`default`** UTC false

**`default`** firstDayOfWeek Sunday

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` | The date |
| `__namedParameters` | `Options` | see [Options](almostEquals.md#options) |

#### Returns

`Date`

Midnight of the last day of the week containing the input date

#### Defined in

[getEndOfWeek.ts:21](../../src/getEndOfWeek.ts#L21)
