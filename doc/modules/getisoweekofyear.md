[@technobuddha/library](../..) / [Modules](../Modules.md) / getISOWeekOfYear

# Module: getISOWeekOfYear

## Table of contents

### References

- [default](getisoweekofyear.md#default)

### Functions

- [getISOWeekOfYear](getisoweekofyear.md#getisoweekofyear)

## References

### default

Renames and exports: [getISOWeekOfYear](getisoweekofyear.md#getisoweekofyear)

## Functions

### getISOWeekOfYear

▸ **getISOWeekOfYear**(`input`: Date, `__namedParameters?`: Options): *object*

Determine the ISO week number for a given date

**`default`** weekOneIncludes Thursday

**`default`** firstDayOfWeek Monday

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date | - | The date |
| `__namedParameters` | Options | {} | - |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `week` | *number* |
| `year` | *number* |

the week number (1-53)

Defined in: [getISOWeekOfYear.ts:25](../../src/getISOWeekOfYear.ts#L25)
