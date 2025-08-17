<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / mask

# Function: mask()

> **mask**(`input`: `string`, `simpleMask`: `string`, `__namedParameters`: [`MaskOptions`](MaskOptions.md)): `string`

Defined in: [mask.ts:29](https://github.com/technobuddha/library/blob/main/src/mask.ts#L29)

Use a simple mask to display a string

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string |
| `simpleMask` | `string` | The mask |
| `__namedParameters` | [`MaskOptions`](MaskOptions.md) | see [MaskOptions](MaskOptions.md) |

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
