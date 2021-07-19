[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / relativeTime

# Module: relativeTime

## Table of contents

### References

- [default](relativeTime.md#default)

### Type aliases

- [Options](relativeTime.md#options)

### Functions

- [relativeTime](relativeTime.md#relativetime)

## References

### default

Renames and exports: [relativeTime](relativeTime.md#relativetime)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `mdFormat?` | `string` | Passed to [formatDate](formatDate.md) to dislay a month and day |
| `timeFormat?` | `string` | Passed to [formatDate](formatDate.md) to display a time |
| `todayTomorrowYesterday?` | `boolean` | Describe the time difference as a time on a nearby day |
| `ymdFormat?` | `string` | Passed to {@link formatSate} to display a year, month and day |

#### Defined in

[relativeTime.ts:8](../../src/relativeTime.ts#L8)

## Functions

### relativeTime

▸ **relativeTime**(`input`, `relativeTo`, `__namedParameters?`): `string`

Describe the difference between two dates in a simple format

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` | The date |
| `relativeTo` | `Date` | The date to compare to |
| `__namedParameters` | [`Options`](relativeTime.md#options) | see [Options](relativeTime.md#options) |

#### Returns

`string`

string describing the time difference between the two dates

#### Defined in

[relativeTime.ts:27](../../src/relativeTime.ts#L27)
