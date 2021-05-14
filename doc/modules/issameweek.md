[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / isSameWeek

# Module: isSameWeek

## Table of contents

### References

- [default](issameweek.md#default)

### Functions

- [isSameWeek](issameweek.md#issameweek)

## References

### default

Renames and exports: [isSameWeek](issameweek.md#issameweek)

## Functions

### isSameWeek

▸ **isSameWeek**(`input1`: Date, `input2`: Date, `__namedParameters?`: Options): *boolean*

Determine if two dates occur in the same week

**`default`** UTC false

**`default`** firstDayOfWeek Sunday

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input1` | Date | - | The first date |
| `input2` | Date | - | The second date |
| `__namedParameters` | Options | {} | see [Options](almostequals.md#options) |

**Returns:** *boolean*

true, if the two dates occur in the same week

Defined in: [src/isSameWeek.ts:22](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/isSameWeek.ts#L22)
