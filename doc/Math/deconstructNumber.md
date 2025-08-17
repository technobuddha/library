<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / deconstructNumber

# Function: deconstructNumber()

> **deconstructNumber**(`input`: `number`, `precision`: `number`): [`DeconstructedNumber`](DeconstructedNumber.md) & \{ `fractional`: [`DeconstructedNumber`](DeconstructedNumber.md); `whole`: [`DeconstructedNumber`](DeconstructedNumber.md); \}

Defined in: [deconstruct-number.ts:46](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L46)

Deconstructs a number into its sign, value, mantissa, and exponent, and separates its whole and fractional parts.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `number` | `undefined` | The number to deconstruct. Must be a finite number. |
| `precision` | `number` | `9` | The number of significant digits to use (default: 9, min: 1, max: 15). |

## Returns

[`DeconstructedNumber`](DeconstructedNumber.md) & \{ `fractional`: [`DeconstructedNumber`](DeconstructedNumber.md); `whole`: [`DeconstructedNumber`](DeconstructedNumber.md); \}

An object containing the normalized value, sign, mantissa, exponent, and separate representations
         of the whole and fractional parts.

## Throws

TypeError If the input is NaN or not a finite number.

## Example

```typescript
const result = deconstructNumber(123.456);
// result = {
//   value: 123.456,
//   sign: 1,
//   mantissa: "123456",
//   exponent: 2,
//   whole: { ... },
//   fraction: { ... }
// }
```
