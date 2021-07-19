[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / getTimezone

# Module: getTimezone

## Table of contents

### References

- [default](getTimezone.md#default)

### Type aliases

- [Options](getTimezone.md#options)

### Functions

- [getTimezone](getTimezone.md#gettimezone)

## References

### default

Renames and exports: [getTimezone](getTimezone.md#gettimezone)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `GMT?` | `boolean` | Display 'GMT' in time zones |
| `Z?` | `boolean` | Display 'Z' for the GMT time zone |

#### Defined in

[getTimezone.ts:5](../../src/getTimezone.ts#L5)

## Functions

### getTimezone

▸ **getTimezone**(`input`, `__namedParameters?`): `string`

Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes

**`remarks`** the GMT flag overrides the Z flag if both are set

**`default`** GMT false

**`default`** Z true

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` \| `number` | The date, or a timezone offset in minutes |
| `__namedParameters` | [`Options`](getTimezone.md#options) | see [Options](getTimezone.md#options) |

#### Returns

`string`

the timezone offset formatted like '±hh:mm' the string is prefixed by 'GMT' if the option is set.  If the Z option is set 'Z' is returned for the
GMT+00:00 timezone

#### Defined in

[getTimezone.ts:23](../../src/getTimezone.ts#L23)
