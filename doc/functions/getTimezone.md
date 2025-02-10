<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / getTimezone

# Function: getTimezone()

> **getTimezone**(`input`, `__namedParameters`): `string`

Defined in: [get-timezone.ts:24](https://github.com/technobuddha/library/blob/main/src/get-timezone.ts#L24)

Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes

## Parameters

### input

The date, or a timezone offset in minutes

`number` | `Date`

### \_\_namedParameters

[`GetTimezoneOptions`](../type-aliases/GetTimezoneOptions.md) = `{}`

see [GetTimezoneOptions](../type-aliases/GetTimezoneOptions.md)

## Returns

`string`

the timezone offset formatted like '±hh:mm' the string is prefixed by 'gmt' if the option is set.  If the z option is set 'z' is returned for the
gmt+00:00 timezone

## Remarks

the gmt flag overrides the z flag if both are set

## Default Value

```ts
gmt false
```

## Default Value

```ts
z true
```
