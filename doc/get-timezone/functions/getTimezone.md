[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [get-timezone](../README.md) / getTimezone

# Function: getTimezone()

> **getTimezone**(`input`, `__namedParameters`): `string`

Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes

## Parameters

• **input**: `number` \| `Date`

The date, or a timezone offset in minutes

• **\_\_namedParameters**: [`Options`](../type-aliases/Options.md) = `{}`

see [Options](../type-aliases/Options.md)

## Returns

`string`

the timezone offset formatted like '±hh:mm' the string is prefixed by 'GMT' if the option is set.  If the Z option is set 'Z' is returned for the
GMT+00:00 timezone

## Remarks

the GMT flag overrides the Z flag if both are set

## Default

```ts
GMT false
```

## Default

```ts
Z true
```

## Defined in

get-timezone.ts:24
