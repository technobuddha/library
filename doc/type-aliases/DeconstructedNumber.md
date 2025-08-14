<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / DeconstructedNumber

# Type Alias: DeconstructedNumber

> **DeconstructedNumber** = \{ `exponent`: `number`; `mantissa`: `string`; `sign`: `1` \| `-1`; `value`: `number`; \}

Defined in: [deconstruct-number.ts:10](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L10)

Represents a number that has been deconstructed into its mathematical components.

## Properties

### exponent

> **exponent**: `number`

Defined in: [deconstruct-number.ts:18](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L18)

The exponent part of the number, indicating the power of 10 by which the mantissa is multiplied.

***

### mantissa

> **mantissa**: `string`

Defined in: [deconstruct-number.ts:16](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L16)

The mantissa (or significand) part of the number, represented as a string.

***

### sign

> **sign**: `1` \| `-1`

Defined in: [deconstruct-number.ts:14](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L14)

The sign of the number, where 1 indicates positive and -1 indicates negative.

***

### value

> **value**: `number`

Defined in: [deconstruct-number.ts:12](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L12)

The original numeric value, rounded to the specified precision
