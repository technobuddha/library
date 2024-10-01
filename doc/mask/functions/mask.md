[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [mask](../README.md) / mask

# Function: mask()

> **mask**(`input`, `maskStr`, `__namedParameters`): `string`

Use a simple mask to display a string

## Parameters

• **input**: `string`

The string

• **maskStr**: `string`

• **\_\_namedParameters**: `Options` = `{}`

see Options

## Returns

`string`

The mask filled with characters from the string

## Remark

The simple mask is a string where '#' characters are replaced by characters from the input string.  Other characters in the mask
are output as-is, to output a '#' use '\#'

## Default

```ts
missing space
```

## Defined in

mask.ts:23
