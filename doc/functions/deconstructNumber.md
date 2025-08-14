<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / deconstructNumber

# Function: deconstructNumber()

> **deconstructNumber**(`input`: `number`, `precision`: `number`): [`DeconstructNumberReturn`](../type-aliases/DeconstructNumberReturn.md)

Defined in: [deconstruct-number.ts:22](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L22)

Deconstructs a number into its sign, whole part, and fractional part.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `number` | `undefined` | The number to deconstruct. |
| `precision` | `number` | `9` | - |

## Returns

[`DeconstructNumberReturn`](../type-aliases/DeconstructNumberReturn.md)

An object containing the sign ('+' or '-'), the whole part, and the fractional part of the input number.
