[@technobuddha/library](../..) / [Modules](../Modules.md) / getTimezone

# Module: getTimezone

## Table of contents

### References

- [default](gettimezone.md#default)

### Type aliases

- [Options](gettimezone.md#options)

### Functions

- [getTimezone](gettimezone.md#gettimezone)

## References

### default

Renames and exports: [getTimezone](gettimezone.md#gettimezone)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `GMT?` | *boolean* | Display 'GMT' in time zones |
| `Z?` | *boolean* | Display 'Z' for the GMT time zone |

Defined in: [src/getTimezone.ts:5](../src/getTimezone.ts#L5)

## Functions

### getTimezone

▸ **getTimezone**(`input`: Date \| *number*, `__namedParameters?`: [*Options*](gettimezone.md#options)): *string*

Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes

**`remarks`** the GMT flag overrides the Z flag if both are set

**`default`** GMT false

**`default`** Z true

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date \| *number* | - | The date, or a timezone offset in minutes |
| `__namedParameters` | [*Options*](gettimezone.md#options) | {} | see [Options](gettimezone.md#options) |

**Returns:** *string*

the timezone offset formatted like '±hh:mm' the string is prefixed by 'GMT' if the option is set.  If the Z option is set 'Z' is returned for the
GMT+00:00 timezone

Defined in: [src/getTimezone.ts:23](../src/getTimezone.ts#L23)
