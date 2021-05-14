[@technobuddha/library](../..) / [Modules](../Modules.md) / getISOWeeksInYear

# Module: getISOWeeksInYear

## Table of contents

### References

- [default](getisoweeksinyear.md#default)

### Functions

- [getISOWeeksInYear](getisoweeksinyear.md#getisoweeksinyear)

## References

### default

Renames and exports: [getISOWeeksInYear](getisoweeksinyear.md#getisoweeksinyear)

## Functions

### getISOWeeksInYear

▸ **getISOWeeksInYear**(`input`: Date \| *number*, `__namedParameters?`: GetWeeksInYearOptions): *number*

Determine the number of ISO weeks within a year

**`default`** weekOneIncludes Thursday

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date \| *number* | - | A date within the year, or a year number |
| `__namedParameters` | GetWeeksInYearOptions | {} | see [Options](almostequals.md#options) |

**Returns:** *number*

The number of weeks in the year (52 or 53)

Defined in: [src/getISOWeeksInYear.ts:21](../../src/getISOWeeksInYear.ts#L21)
