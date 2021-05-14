[@technobuddha/library](../..) / [Modules](../Modules.md) / relativeTime

# Module: relativeTime

## Table of contents

### References

- [default](relativetime.md#default)

### Type aliases

- [Options](relativetime.md#options)

### Functions

- [relativeTime](relativetime.md#relativetime)

## References

### default

Renames and exports: [relativeTime](relativetime.md#relativetime)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `mdFormat?` | *string* | Passed to [formatDate](formatdate.md) to dislay a month and day |
| `timeFormat?` | *string* | Passed to [formatDate](formatdate.md) to display a time |
| `todayTomorrowYesterday?` | *boolean* | Describe the time difference as a time on a nearby day |
| `ymdFormat?` | *string* | Passed to {@link formatSate} to display a year, month and day |

Defined in: [src/relativeTime.ts:7](../../src/relativeTime.ts#L7)

## Functions

### relativeTime

▸ **relativeTime**(`input`: Date, `relativeTo`: Date, `__namedParameters?`: [*Options*](relativetime.md#options)): *string*

Describe the difference between two dates in a simpe format

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date | - | The date |
| `relativeTo` | Date | - | The date to compare to |
| `__namedParameters` | [*Options*](relativetime.md#options) | {} | see [Options](relativetime.md#options) |

**Returns:** *string*

string describing the time difference between the two dates

Defined in: [src/relativeTime.ts:26](../../src/relativeTime.ts#L26)
