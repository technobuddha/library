<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / fraction

# Function: fraction()

> **fraction**(`input`: `number`, `options`: [`FractionOptions`](../type-aliases/FractionOptions.md)): `string`

Defined in: [numbering/fraction.ts:67](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L67)

Converts a numeric input into a formatted fraction string, either in numeric or alphabetic form.

The function finds the closest matching fraction from a predefined list and formats the output
based on the specified options. If the input is negative, the result is prefixed accordingly.
The output can be either a numeric representation (e.g., "1 1/2") or an alphabetic representation
(e.g., "one and one half").

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | The number to convert to a fraction string. |
| `options` | [`FractionOptions`](../type-aliases/FractionOptions.md) | An optional object specifying the output format. |

## Returns

`string`

The formatted fraction string.
