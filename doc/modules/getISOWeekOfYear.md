[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getISOWeekOfYear

# Module: getISOWeekOfYear

## Table of contents

### References

- [default](getISOWeekOfYear.md#default)

### Functions

- [getISOWeekOfYear](getISOWeekOfYear.md#getisoweekofyear)

## References

### default

Renames and exports: [getISOWeekOfYear](getISOWeekOfYear.md#getisoweekofyear)

## Functions

### getISOWeekOfYear

▸ **getISOWeekOfYear**(`input`, `__namedParameters?`): `Object`

Determine the ISO week number for a given date

**`default`** weekOneIncludes Thursday

**`default`** firstDayOfWeek Monday

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` | The date |
| `__namedParameters` | `Options` | - |

#### Returns

`Object`

the week number (1-53)

| Name | Type |
| :------ | :------ |
| `week` | `number` |
| `year` | `number` |

#### Defined in

[getISOWeekOfYear.ts:25](../../src/getISOWeekOfYear.ts#L25)
