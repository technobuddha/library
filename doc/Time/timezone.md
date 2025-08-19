<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / timezone

# Function: timezone()

> **timezone**(`input`: `number` \| [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `options`: [`TimezoneOptions`](TimezoneOptions.md)): `string`

Defined in: timezone.ts:31

Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` \| [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date, or a timezone offset in minutes |
| `options` | [`TimezoneOptions`](TimezoneOptions.md) | see [TimezoneOptions](TimezoneOptions.md) |

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
