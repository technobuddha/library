<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / mask

# Function: mask()

> **mask**(`input`, `simpleMask`, `__namedParameters`): `string`

Defined in: [mask.ts:23](https://github.com/technobuddha/library/blob/main/src/mask.ts#L23)

Use a simple mask to display a string

## Parameters

### input

`string`

The string

### simpleMask

`string`

The mask

### \_\_namedParameters

[`MaskOptions`](../type-aliases/MaskOptions.md) = `{}`

see [MaskOptions](../type-aliases/MaskOptions.md)

## Returns

`string`

The mask filled with characters from the string

## Remarks

The simple mask is a string where '#' characters are replaced by characters from the input string.  Other characters in the mask
are output as-is, to output a '#' use '\#'

## Default Value

```ts
missing space
```
