[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getISOWeeksInYear

# Module: getISOWeeksInYear

## Table of contents

### References

- [default](getISOWeeksInYear.md#default)

### Functions

- [getISOWeeksInYear](getISOWeeksInYear.md#getisoweeksinyear)

## References

### default

Renames and exports: [getISOWeeksInYear](getISOWeeksInYear.md#getisoweeksinyear)

## Functions

### getISOWeeksInYear

▸ **getISOWeeksInYear**(`input`, `__namedParameters?`): `number`

Determine the number of ISO weeks within a year

**`default`** weekOneIncludes Thursday

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` \| `number` | A date within the year, or a year number |
| `__namedParameters` | `GetWeeksInYearOptions` | see [Options](almostEquals.md#options) |

#### Returns

`number`

The number of weeks in the year (52 or 53)

#### Defined in

[getISOWeeksInYear.ts:21](../../src/getISOWeeksInYear.ts#L21)
